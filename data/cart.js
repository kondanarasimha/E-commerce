  export let cart;

  loadFromStorage();

  export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) { //if cart is empty by using this defulate
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
  };
  
  
  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

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
          quantity,//productId: productId {Destructuring}
          deliveryOptionId: '1'
        });
      }
      saveLocalStorage();
  };

  export function removeFromCart(productId) {
    const newCart = []

    cart.forEach((cartItem)=> {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    })
    cart = newCart
    saveLocalStorage();
  };

  export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem)=> {
      cartQuantity += cartItem.quantity
    })
    return cartQuantity
  };

  export function updateQuantity(productId, newQuantity) {
    let matchingItem;
    
    cart.forEach((cartItem)=> {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })
    matchingItem.quantity = newQuantity
    saveLocalStorage();
   };

  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

      cart.forEach((cartItem)=> {
        if(productId === cartItem.productId) {
          matchingItem = cartItem
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      saveLocalStorage();
   };

   export function loadCart(fun) { //fun is parameter(callback function) to run the html grid on the page.
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load',()=> {
      console.log(xhr.response);
        
      fun();
  
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
   };