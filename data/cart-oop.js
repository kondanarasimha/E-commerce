  function Cart(localStorageKey) { //genrating object using object.
    const cart = {
      cartItems: undefined,
  
      loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if(!this.cartItems) { //if cart is empty by using this defulate
        this.cartItems = [{
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
    },
  
      saveLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
      },
  
      addToCart(productId,quantity) {
        let matchingItem;
    
          this.cartItems.forEach((cartItem)=> {
            if(productId === cartItem.productId) {
              matchingItem = cartItem
            }
          });
    
          if(matchingItem) {
            matchingItem.quantity += quantity;
          } else {
            this.cartItems.push({
              productId, //productId: productId {Destructuring}
              quantity,//productId: productId {Destructuring}
              deliveryOptionId: '1'
            });
          }
          this.saveLocalStorage();
      },
  
      removeFromCart(productId) {
        const newCart = []
    
        this.cartItems.forEach((cartItem)=> {
          if(cartItem.productId !== productId) {
            newCart.push(cartItem)
          }
        })
        this.cartItems = newCart
        this.saveLocalStorage();
      },
  
      calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem)=> {
          cartQuantity += cartItem.quantity
        })
        return cartQuantity
      },
  
      updateQuantity(productId, newQuantity) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem)=> {
          if(productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        })
        matchingItem.quantity = newQuantity
        this.saveLocalStorage();
       },
  
       updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
          this.cartItems.forEach((cartItem)=> {
            if(productId === cartItem.productId) {
              matchingItem = cartItem
            }
          });
    
          matchingItem.deliveryOptionId = deliveryOptionId;
    
          this.saveLocalStorage();
       }
  
    };

    return cart;
  }

  const cart = Cart('cart-oop'); //saving the Cart function return values into the cart variabel.
  const businessCart = Cart('cart-business'); //saving the Cart function return values into business Cart.
    
  cart.loadFromStorage();
  businessCart.loadFromStorage();

  console.log(cart);
  console.log(businessCart);


