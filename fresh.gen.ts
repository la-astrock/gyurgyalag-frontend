// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $api_shopify from "./routes/api/shopify.ts";
import * as $index from "./routes/index.tsx";
import * as $products_product_ from "./routes/products/[product].tsx";
import * as $AddToCart from "./islands/AddToCart.tsx";
import * as $Cart from "./islands/Cart.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $ProductDetails from "./islands/ProductDetails.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/api/shopify.ts": $api_shopify,
    "./routes/index.tsx": $index,
    "./routes/products/[product].tsx": $products_product_,
  },
  islands: {
    "./islands/AddToCart.tsx": $AddToCart,
    "./islands/Cart.tsx": $Cart,
    "./islands/Header.tsx": $Header,
    "./islands/ProductDetails.tsx": $ProductDetails,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
