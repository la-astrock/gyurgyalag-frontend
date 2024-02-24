import { useEffect, useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { apply, tw } from "twind";
import { animation, css } from "twind/css";
import IconCart from "@/components/IconCart.tsx";
import { addToCart, cart, cartQuantity, getCartQuantity, cartContent, removeFromCart, changeQuantity } from "@/utils/cart.ts";
import { h } from 'preact'
import { useSignal } from "@preact/signals";
import { ChevronUpCircle, ChevronDownCircle } from "lucide"

// Lazy load a <dialog> polyfill.
// @ts-expect-error HTMLDialogElement is not just a type!
if (IS_BROWSER && window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
  }
}

const slideRight = animation("0.4s ease normal", {
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});

const slideBottom = animation("0.4s ease normal", {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

const backdrop = css({
  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.5)",
  },
});

export default function Cart() {

  const ref = useRef<HTMLDialogElement | null>(null);
  const [state, setState] = useState(null)

  const getProductQuantity = () => {
    const totalQuantity = cart.value.reduce((accumulator, object) => {
        return accumulator + object.quantity
      }, 0);
      return totalQuantity
}

const uniqueProductArray = (prodArray) => {
 if (prodArray.length !== 0) {
  const unique = prodArray
  .map((item) => item.productId)
  .filter((value, index, self) => self.indexOf(value) === index);
  return unique 
 }
}


  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === "DIALOG") {
      ref.current!.close();
    }
  };

  return (
    <div>
      <button
        onClick={() => ref.current!.showModal()}
        class="flex items-center gap-2 items-center border-2 border-gray-800 rounded-full px-5 py-1 font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
      >
        <IconCart />
        {getCartQuantity ? getCartQuantity : 0}
      </button>
      <dialog
        ref={ref}
        class={tw`bg-transparent p-0 m-0 pt-[50%] sm:pt-0 sm:ml-auto max-w-full sm:max-w-lg w-full max-h-full h-full ${slideBottom} sm:${slideRight} ${backdrop}`}
        onClick={onDialogClick}
      >
        <CartInner  />
      </dialog>
    </div>
  );
}

function CartInner() {
  const corners = "rounded(tl-2xl tr-2xl sm:(tr-none bl-2xl))";
  const card =
    `py-8 px-6 h-full bg-white ${corners} flex flex-col justify-between`;
  //const { data: cart } = useCart();
  

  const checkout = (e: Event) => {
    e.preventDefault();
    if (cart.value) {
      location.href = '/';
    }
  };

  const remove = (itemId: string) => {
    removeFromCart(itemId)
  };

  return (
    <div class={card}>
      <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Rendelés</h2>
        <button
          class="py-1"
          onClick={(e) => {
            (e.target as HTMLButtonElement).closest("dialog")!.close();
          }}
        >
          <svg
            class="w-6 h-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      {cart.value && (
        <div class="flex-grow-1 my-4 max-h-[300px] overflow-y-scroll">
          {cart.value.length === 0
            ? <p class="text-gray-700">A rendelés nem tartalmaz termékeket.</p>
            : (
              <ul role="list" class="-my-6 divide-y divide-gray-200">
               
                {cart.value && cart.value && cart.value.map(product => (
                  <li class="flex py-6">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.productimageurl}
                        alt={product.name}
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <p class="ml-4">
                            {/* {formatCurrency(line.estimatedCost.totalAmount)} */}
                          </p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">
                         
                        </p>
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm">
                        <span class="flex flex-col items-center m-2">
                        <button class="cursor-pointer" onClick={() => changeQuantity(product.productId, 'up')}><ChevronUpCircle color="#6B7280" size={26} /></button>
                        <p class="text-gray-500">
                          Mennyiség: <strong>{product.quantity}</strong>
                        </p>
                        <button class="cursor-pointer" onClick={() => changeQuantity(product.productId, 'down')}><ChevronDownCircle color="#6B7280" size={26} /></button>
                        </span>

                        <div class="flex"> 
                          <button
                            type="button"
                            class="font-medium"
                            onClick={() => remove(product.productId)}
                          >
                            Eltávolítás
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
      )}
      {cart.value && (
        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div class="flex justify-between text-lg font-medium">
            <p>Összesen</p>
            {/* <p>{formatCurrency(props.cart.estimatedCost.totalAmount)}</p> */}
          </div>
          <p class="mt-0.5 text-sm text-gray-500">
            Az esetleges szállítások díjakat a következő lépésben számolja a rendszer.
          </p>
          <div class="mt-6">
            <button
              type="button"
              class="w-full bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700"
              disabled={cart.value && cart.value.length === 0}
              onClick={checkout}
            >
              Véglegesítés
            </button>
          </div>
          <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              vagy &nbsp;
              <button
                type="button"
                class="font-medium"
                onClick={(e) => {
                  (e.target as HTMLButtonElement).closest("dialog")!.close();
                }}
              >
                További termékek rendelése <span aria-hidden="true">&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
