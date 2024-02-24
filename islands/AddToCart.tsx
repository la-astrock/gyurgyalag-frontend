import { useState } from "preact/hooks";
//import { addToCart, useCart } from "@/utils/data.ts";
import { cart, addToCart } from "@/utils/cart.ts"
import ProductDetails from "@/islands/ProductDetails.tsx";
import { PropertyAssignment } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";
interface AddToCartProps {
  id: string;
  price: number;
}

export default function AddToCart(props: AddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);

  const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

  const add = async (e: MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(props.id, props.price, props.name, props.productimageurl)
    await wait(250);
    setIsAdding(false)
  };

  return (
    <button
      onClick={add}
      disabled={!props && !isAdding}
      class={`w-full ${
        isAdding ? "!bg-gray-400" : "bg-gray-700"
      } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900`}
    >
      {isAdding ? "Hozzáadás..." : "Hozzáadás a rendeléshez"}
    </button>
  );
}
