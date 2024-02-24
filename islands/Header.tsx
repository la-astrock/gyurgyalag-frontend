import { useEffect } from "preact/hooks";
import Cart from "./Cart.tsx";
import { overwriteCart } from "@/utils/cart.ts";

export function Header() {
  useEffect(() => {
    overwriteCart()
  },[])
  
  return (
    <header
      class="h-[110px] sm:!h-[144px] w-full bg-cover bg-no-repeat fixed top-0 z-[999]"
      style={{
        backgroundImage: "url(/header_bg.svg)",
      }}
    >
      <div class="rainfall w-full h-full absolute" />
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex items-center justify-between relative">
        <a href="/">
          <img
            src="/logo.svg"
            alt="Deno Logo"
            class="h-14 w-14"
          />
        </a>
        <h1>
          
        </h1>
        <Cart />
      </nav>
    </header>
  );
}
