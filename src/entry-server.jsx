import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { Buffer } from "node:buffer";
import App from "./App";

// Wait for lazy routes before sending HTML: crawlers and people get the same UI.
export function render(url, data) {
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    let failure;
    const stream = renderToPipeableStream(
      <React.StrictMode><App serverUrl={url} initialData={data} helmetContext={helmetContext} /></React.StrictMode>,
      {
        onAllReady() {
          if (failure) { clearTimeout(timer); reject(failure); return; }
          const chunks = [];
          const output = new PassThrough();
          output.on("data", (chunk) => chunks.push(chunk));
          output.on("error", reject);
          output.on("end", () => {
            clearTimeout(timer);
            const head = new Map();
            // React 19 hoists metadata to the start of a rendered fragment.
            // Put it in the actual document head rather than inside #root.
            const html = Buffer.concat(chunks).toString("utf8").replace(
              /<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g,
              (tag) => {
                const identity = tag.startsWith("<title") ? "title"
                  : tag.startsWith("<meta") ? `meta:${tag.match(/(?:name|property)="([^"]+)"/)?.[1] || tag}`
                  : tag.startsWith("<link") && /rel="canonical"/.test(tag) ? "canonical"
                  : tag;
                head.set(identity, tag);
                return "";
              },
            );
            resolve({ html, head: [...head.values()].join("") });
          });
          stream.pipe(output);
        },
        onShellError(error) { clearTimeout(timer); reject(error); },
        onError(error) { failure = error; },
      },
    );
    const timer = setTimeout(() => { stream.abort(); reject(new Error("Storefront render timed out")); }, 10000);
  });
}
