import assert from "node:assert/strict";
import process from "node:process";
import { JSDOM } from "jsdom";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const { html, path } = JSON.parse(input);
const dom = new JSDOM(html, { url: `https://www.giftunwrap.com${path}`, pretendToBeVisual: true });
for (const name of ["window", "document", "HTMLElement", "Element", "Node", "MutationObserver", "Event", "CustomEvent", "localStorage"])
  Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true });
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
dom.window.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
const restoredCart = [{ id: 880, category: "giftsForHim", name: "Existing cart item", price: 500, quantity: 2 }];
localStorage.setItem("cartItems", JSON.stringify(restoredCart));
const cards = [{ id: 904, name: "Sending You Love", price: 150, image: "https://example.com/card.jpg", inStock: true }];
const requestUrl = (request) => typeof request === "string" ? request : request?.url || String(request);
const responseData = (url) => requestUrl(url).includes("cards") ? cards : JSON.parse(document.getElementById("__STOREFRONT_DATA__").textContent).collections || [];
const jsonResponse = (url) => new Response(JSON.stringify(responseData(url)), { status: 200, headers: { "Content-Type": "application/json" } });
globalThis.fetch = async (url) => jsonResponse(url);
window.fetch = globalThis.fetch;
class MockXMLHttpRequest {
  constructor() { this.upload = { addEventListener() {} }; this.readyState = 0; this.status = 0; this.responseText = ""; }
  open(method, url) { this.method = method; this.url = url; this.readyState = 1; }
  setRequestHeader() {}
  addEventListener(type, listener) { this[`on${type}`] = listener; }
  getAllResponseHeaders() { return "content-type: application/json\r\n"; }
  abort() {}
  send() {
    this.status = 200;
    this.statusText = "OK";
    this.responseText = JSON.stringify(responseData(this.url));
    this.response = this.responseText;
    this.readyState = 4;
    queueMicrotask(() => { this.onloadend?.(); this.onreadystatechange?.(); this.onload?.(); });
  }
}
window.XMLHttpRequest = MockXMLHttpRequest;
globalThis.XMLHttpRequest = MockXMLHttpRequest;
const errors = [];
const oldError = console.error;
console.error = (...args) => { errors.push(args.map(String).join(" ")); };
// React must detect browser input events after the DOM globals are installed.
const { hydrateStorefront } = await import("../test-dist/hydrate.js");
const snapshot = JSON.parse(document.getElementById("__STOREFRONT_DATA__").textContent);
const root = hydrateStorefront(document.getElementById("root"), snapshot, {
  onRecoverableError: (error) => errors.push(error.message),
});
const tick = () => new Promise((resolve) => setTimeout(resolve, 100));
await tick(); await tick();
for (let attempt = 0; attempt < 100 && !document.querySelector('button[aria-label="Shopping cart with 2 items"]'); attempt += 1) await tick();
assert.equal(errors.filter((error) => /hydration|didn.t match|server rendered|react error #/i.test(error)).length, 0, errors.join("\n"));
if (path !== "/personalized-gifts" && !path.startsWith("/sweet-treats")) {
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
}
assert.deepEqual(JSON.parse(localStorage.getItem("cartItems")), restoredCart);
assert.ok(document.querySelector('button[aria-label="Shopping cart with 2 items"]'));
document.querySelector('button[aria-label="Open menu"]').click();
await tick();
const mobileMenu = document.querySelector('nav[aria-label="Mobile navigation"]');
assert.ok(mobileMenu);
assert.equal(mobileMenu.parentElement, document.body);
assert.ok([...mobileMenu.querySelectorAll('button')].some((button) => button.textContent === 'My Account'));
assert.ok(Number.parseFloat(mobileMenu.style.maxHeight) > 0);
window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
await tick();
assert.equal(document.querySelector('nav[aria-label="Mobile navigation"]'), null);
if (path === "/personalized-gifts") {
  assert.match(document.getElementById("root").textContent, /Friendship Photo Frame/);
  assert.doesNotMatch(document.getElementById("root").textContent, /0 gifts/);
}
if (path.startsWith("/sweet-treats")) {
  const clickText = async (text) => {
    const button = [...document.querySelectorAll('.gu-collection-main button')].find((element) => element.textContent.trim() === text);
    assert.ok(button, `Missing collection control: ${text}`);
    button.click();
    await tick();
    for (let attempt = 0; attempt < 50 && document.querySelector('.gu-collection-grid[aria-busy="true"]'); attempt += 1) await tick();
  };
  const names = () => [...document.querySelectorAll('.gu-collection-grid h2')].map((element) => element.textContent);
  await clickText('Profile');
  assert.deepEqual([...document.querySelectorAll('[role="menu"][aria-label="Profile"] button')].map((element) => element.textContent), ['Cakes', 'Brownies', 'Cookies', 'Chocolates']);
  await clickText('Brownies');
  assert.deepEqual(names(), ['Fudge Brownies'], document.querySelector('.gu-collection-catalog').textContent);
  assert.equal(new URLSearchParams(window.location.search).get('profile'), 'brownies');
  assert.equal(new URLSearchParams(window.location.search).has('page'), false);
  await clickText('Brownies');
  await clickText('Cookies');
  assert.deepEqual(names(), ['Chocolate Cookies']);
  await clickText('Cookies');
  await clickText('Chocolates');
  assert.deepEqual(names(), ['Chocolate Cookies']);
  await clickText('Clear filters');
  for (let attempt = 0; attempt < 50 && names().length !== 16; attempt += 1) await tick();
  assert.equal(names().length, 16);
  assert.equal(window.location.search, '');
  await clickText('Profile');
  await clickText('Cakes');
  for (let attempt = 0; attempt < 50 && names().length !== 16; attempt += 1) await tick();
  assert.equal(names().length, 16);
  assert.equal(document.querySelector('[aria-label="Product pages"] [aria-current="page"]').textContent, '1');
}
if (path.startsWith("/product/")) {
  const clickText = (text) => {
    const button = [...document.querySelectorAll("button")].find((element) => element.textContent.trim() === text);
    assert.ok(button, `Missing control: ${text}`);
    button.click();
  };
  clickText("Sizes"); await tick();
  clickText("Large"); await tick();
  assert.match(document.querySelector(".gu-pdp-price-row").textContent, /2,990/);
  for (let attempt = 0; attempt < 20 && !document.querySelector('img[alt="Sending You Love"]'); attempt += 1) await tick();
  assert.ok(document.querySelector('[role="radio"][aria-label="Sending You Love"]') || document.querySelector('img[alt="Sending You Love"]'));
  const cakeInput = document.getElementById("gu-pdp-cake-message");
  const setCakeMessage = async (value) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    setter.call(cakeInput, value);
    cakeInput.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
  };
  if (snapshot.product?.allowCakeMessage) {
    assert.ok(cakeInput);
    assert.equal(cakeInput.maxLength, 50);
    await setCakeMessage("  Happy Birthday, Ali!  ");
  } else {
    assert.equal(cakeInput, null);
  }
  clickText("Add to cart"); await tick();
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  assert.equal(cart.length, 2);
  assert.equal(cart[1].price, 2990);
  if (cakeInput) {
    assert.equal(cart[1].personalization.cakeMessage, "Happy Birthday, Ali!");
    await setCakeMessage("Happy Birthday, Sara!");
    await new Promise((resolve) => setTimeout(resolve, 800));
    clickText("Add to cart"); await tick();
    const updatedCart = JSON.parse(localStorage.getItem("cartItems"));
    assert.equal(updatedCart.length, 3);
    assert.notEqual(updatedCart[1].cartKey, updatedCart[2].cartKey);
    assert.equal(updatedCart[2].personalization.cakeMessage, "Happy Birthday, Sara!");
    assert.equal(updatedCart[1].personalization.cakeMessage, "Happy Birthday, Ali!");
  }
}
root.unmount();
console.error = oldError;
dom.window.close();
process.stdout.write("Hydration, metadata, cart restoration and interactive controls passed\n");
