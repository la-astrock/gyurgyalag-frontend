import { useState } from "preact/hooks";
import { tw } from "twind";
import { css } from "twind/css";
import { aspectRatio } from "@twind/aspect-ratio";
import AddToCart from "@/islands/AddToCart.tsx";
import { formatCurrency } from "@/utils/data.ts";
import { Product } from "@/utils/types.ts";
import { allergenSelector } from "@/utils/allergens.ts"


const descriptionStyles = css({
  "a": {
    color: "#056CF0",
  },
  "a:hover": {
    textDecoration: "underline",
  },
});

export default function ProductDetails({ product }) {

  const src = `https://barcode.tec-it.com/barcode.ashx?data=${product.barcode}&code=Code128&translate-esc=on`
  return (
    <div class="w-11/12 max-w-5xl mx-auto mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16">
      {/* Product details */}
      <div>
        <div class="flex flex-col gap-4">
          <div class="w-full flex items-center justify-between gap-4">
            <hgroup>
              <h2 class="text-xl lg:!text-2xl font-semibold text-gray-800">
                {product.name}
              </h2>
              
              <img src={src} class="h-14"></img>
              <span class="inline-block w-10 h-10">
              <svg version="1.1" viewBox="0 0 242 200" xmlns="http://www.w3.org/2000/svg"></svg>
              </span>
            </hgroup>
            <div class="bg-[#E8E7E5] rounded-full px-6 py-2 text-lg text-gray-900 font-bold">
              {formatCurrency({amount: product.price, currencyCode: 'HUF'})}
            </div>
          </div>
        </div>

        <section
          aria-labelledby="information-heading"
          class="mt-4 pt-6 border-t-1 border-gray-200"
        >
          <h2 id="information-heading" class="sr-only">
            Product information
          </h2>
          <div class="mt-4 space-y-6 mb-4">
            {product.description && <p
              class={tw`text-base text-gray-600 ${descriptionStyles}`}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            }
          </div>
          <h4 class="text-gray-900 font-bold">Allergének</h4>
          <div class="flex flex-row items-center gap-4 items-end">
            {product.allergens && product.allergens.map((allergen) => (
               <img
               class="my-6"
               src={allergenSelector(allergen)}
               width="32"
               height="32"
               alt="lā āstrock SIA"
               /> 
            ))}
          </div>

          {/* {!variant.availableForSale && (
            <div class="flex items-center">
              <p class="text-base text-gray-500">
                Out of stock
              </p>
            </div>
          )} */}

         
        </section>
      </div>

      {/* Product image */}
      <div
        class={tw`${
          aspectRatio(1, 1)
        } w-full bg-white rounded-xl border-2 border-gray-200 mt-12 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start`}
      >
        <div class="rounded-lg overflow-hidden">
          {product.product_image && product.product_image.url && (
            <img
              id="productImage"
              src={product.product_image.url}
              alt={product.namet}
              width="400"
              height="400"
              class="w-full h-full object-center object-contain"
            />
          )}

          
        </div>
      </div>

      {/* Product form */}
      <div class="mt-12 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
        <section aria-labelledby="options-heading">
        
          
            <div class="mt-4"> 
              <AddToCart id={product.id} price={product.price} name={product.name} productimageurl={product.product_image.url} />
            </div>
          
        </section>
      </div>
    </div>
  );
}
