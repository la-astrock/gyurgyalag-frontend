import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "twind";
import { aspectRatio } from "@twind/aspect-ratio";
import { formatCurrency } from "@/utils/data.ts";
import { graphql } from "@/utils/shopify.ts";
import { Footer } from "@/components/Footer.tsx";
import { HeadElement } from "@/components/HeadElement.tsx";
import { Header } from "../islands/Header.tsx";
import IconCart from "@/components/IconCart.tsx";
import { List, Product } from "../utils/types.ts";


const q = `{
  products(first: 20) {
    nodes {
      id
      handle
      title
      featuredImage {
        url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}`;

interface Data {
  products: List<Product>;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const data = await fetch('http://192.168.0.14:8000/getcategorieswithproducts')
    return ctx.render(await data.json());
  },
};

export default function Home(ctx: PageProps<Data>) {
  const { data, url } = ctx;
  const categoryProducts = data
  return (
    <div>
      <HeadElement
        description="Shop for Deno Merch"
        image={url.href + "og-image.png"}
        title="Gyurgyalag Falatozó"
        url={url}
      />
     
      <div
        class="w-11/12 max-w-5xl mx-auto mt-28"
        aria-labelledby="information-heading"
      >
        <h2 id="information-heading" class="sr-only">
          Product List
        </h2>

        <div class="mt-[11rem]">
          { categoryProducts.map((category) => (
            <>
            { category.products && category.products.records && <div class="text-3xl mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl">{category.name}</div>}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {category.products && category.products.records && category.products.records.map((product) => (
                 <ProductCard product={product} /> 
              ))}
            </div>
            </>
          ))}
        </div>
        <div
          class="grid grid-cols-1 gap-8 sm:!gap-x-10 sm:!grid-cols-2 lg:!grid-cols-3 lg:!gap-x-12 lg:!gap-y-10"
        >
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductCard({product}) {
  
  return (
    <a key={product.id} href={`/products/${product.id}`} class="group">
      <div
        class={tw`${
          aspectRatio(1, 1)
        } w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-500 relative`}
      >
        {product.product_image.storageKey && (
          <img
            src={`https://eu-central-1.storage.xata.sh/${product.product_image.storageKey}`}
            alt={product.name}
            width="400"
            height="400"
            class="w-full h-full object-center object-contain absolute block"
          />
        )}
        <div
          class="w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <IconCart size={30} />
        </div>
      </div>
      <div class="flex items-center justify-between mt-3">
        <h3 class="text-lg text-gray-800 font-medium relative">
          {product.name}
          <span
            class="bg-gray-800 h-[3px] w-0 group-hover:!w-full absolute bottom-[-2px] left-0 transition-all duration-400"
          />
        </h3>
        <strong class="text-lg font-bold text-gray-800">
          {formatCurrency({amount: product.price, currencyCode: 'HUF'})}
        </strong>
      </div>
    </a>
  );
}
