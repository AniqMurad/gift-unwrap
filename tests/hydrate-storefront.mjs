import assert from "node:assert/strict";
import process from "node:process";
import { JSDOM } from "jsdom";
import { hydrateStorefront } from "../test-dist/hydrate.js";

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
const jsonResponse = (url) => new Response(JSON.stringify(requestUrl(url).includes("cards") ? cards : []), { status: 200, headers: { "Content-Type": "application/json" } });
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
    this.responseText = JSON.stringify(requestUrl(this.url).includes("cards") ? cards : []);
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
const snapshot = JSON.parse(document.getElementById("__STOREFRONT_DATA__").textContent);
const root = hydrateStorefront(document.getElementById("root"), snapshot, {
  onRecoverableError: (error) => errors.push(error.message),
});
const tick = () => new Promise((resolve) => setTimeout(resolve, 100));
await tick(); await tick();
assert.equal(errors.filter((error) => /hydration|didn.t match|server rendered|react error #/i.test(error)).length, 0, errors.join("\n"));
if (path !== "/personalized-gifts") {
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
}
assert.deepEqual(JSON.parse(localStorage.getItem("cartItems")), restoredCart);
assert.ok(document.querySelector('button[aria-label="Shopping cart with 2 items"]'));
if (path === "/personalized-gifts") {
  assert.match(document.getElementById("root").textContent, /Friendship Photo Frame/);
  assert.doesNotMatch(document.getElementById("root").textContent, /0 gifts/);
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
  clickText("Add to cart"); await tick();
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  assert.equal(cart.length, 2);
  assert.equal(cart[1].price, 2990);
}
root.unmount();
console.error = oldError;
dom.window.close();
process.stdout.write("Hydration, metadata, cart restoration and interactive controls passed\n");
