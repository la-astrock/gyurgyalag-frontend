import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "../islands/Header.tsx";
import { addToCart, cart, cartQuantity } from "@/utils/cart.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/app.css" />
      </Head>
      <Header carty={cart} />
       <Component />
    </>
  );
}
