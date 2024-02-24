import { signal, computed } from "@preact/signals";
import { ulid } from "ULID"
import { initialize } from "https://deno.land/x/esbuild@v0.19.11/mod.js";

export const cart = signal([]);
export const cartQuantity = signal(0)

export const overwriteCart = () => {
    const localStoreCart = localStorage.getItem('initiatedCart')
    if (localStoreCart) {
        const cartToInject = JSON.parse(localStoreCart)
    cart.value = [...cartToInject]   
    }
}

export const addToCart = (productId: string, price: number, name: string, productimageurl: string) => {
    const objectId = cart.value.findIndex((obj) => obj.productId === productId)
        if (cart.value === undefined || cart.value === null || cart.value.length === 0) {
            cart.value = [{productId: productId, quantity: 1, price: price, name: name, productimageurl: productimageurl}]
            localStorage.setItem('initiatedCart', JSON.stringify(cart.value))
        } else {
            if (objectId !== -1) {
                cart.value[objectId].quantity =  cart.value[objectId].quantity + 1
                cart.value = [...cart.value]
                localStorage.setItem('initiatedCart', JSON.stringify(cart.value))
            } else if (objectId === -1) {
                cart.value = [...cart.value, {productId: productId, quantity: 1, price: price, name: name, productimageurl: productimageurl}]
                localStorage.setItem('initiatedCart', JSON.stringify(cart.value)) 
            }
        }
}

export const removeFromCart = (productId: number) => {
    if (cart.value.length === 1) {
        cart.value = []
        localStorage.setItem('initiatedCart', [])
    }
    const filteredArr = cart.value.filter(product => product.productId !== productId);
    cart.value = filteredArr
    localStorage.setItem('initiatedCart', JSON.stringify(cart.value)) 
}

export const changeQuantity = (productId: string, direction: string) => {
    const objectId = cart.value.findIndex((obj) => obj.productId === productId)
    if (cart.value[objectId].quantity === 1 && direction === 'down') {
        removeFromCart(productId)
    }
    if (direction === 'up') {
        cart.value[objectId].quantity =  cart.value[objectId].quantity + 1
        cart.value = [...cart.value]
        localStorage.setItem('initiatedCart', JSON.stringify(cart.value))
    } else if (direction === 'down') {
        cart.value[objectId].quantity =  cart.value[objectId].quantity - 1
        cart.value = [...cart.value]
        localStorage.setItem('initiatedCart', JSON.stringify(cart.value))
    }
}

export const initiateSaleId = async () => {
    try {
        const initiatedSale = await fetch("http://192.168.0.14:8000/initiatesale", {
          method: "GET",
        });
        const result = await initiatedSale.json();
        localStorage.setItem('initiatedSaleId', result);
      } catch (error) {
        console.log(error);
      }
}

export const getInitiatedSaleId = async () => {
    const result = await localStorage.getItem('initiatedSaleId')
    return result
}

export const cartContent = computed(() => {
    return cart.value
 })

export const getCartQuantity = computed(() => {
   return cart.value.reduce((accumulator, object) => {
        return accumulator + object.quantity
      }, 0);
    }
)
