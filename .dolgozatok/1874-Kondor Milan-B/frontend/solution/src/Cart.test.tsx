// @vitest-environment happy-dom

import { renderToString } from "react-dom/server";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./components/header.tsx";

describe("Kosár", () => {
  it("Tartalmazza-e a kosár szöveget", () => {
    const html = renderToString(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(html).toContain("Kosár");
  });
});
