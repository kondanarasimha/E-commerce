  export let cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) { //if cart is empty by using this defulate
    [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
    }];
  }
  
  
  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  export function addToCart(productId,quantity) {
    let matchingItem;

      cart.forEach((cartItem)=> {
        if(productId === cartItem.productId) {
          matchingItem = cartItem
        }
      });

      if(matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId, //productId: productId {Destructuring}
          quantity //productId: productId {Destructuring}
        })
      }
      saveLocalStorage();
  }

  export function removeFromCart(productId) {
    const newCart = []

    cart.forEach((cartItem)=> {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    })
    cart = newCart
    saveLocalStorage();
  }