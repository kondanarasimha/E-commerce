  import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from "../data/cart.js";
  import {products} from "../data/products.js";
  import {fromatCurrency} from "./utils/money.js";

  let cartSummaryHtml = '';

  cart.forEach((cartItem)=> {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product)=> {
      if(product.id === productId) {
        matchingProduct = product;
      }
    });

     cartSummaryHtml += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
        &#8377 ${fromatCurrency(matchingProduct.priceCents / 2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-lable-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
            </span>
            <input type="number" min="1" max="15" class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingProduct.id}'>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml

  document.querySelectorAll('.js-delete-link').forEach((link)=> {
    link.addEventListener('click',()=> {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = 
    document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove()
    updateCartQuantity()
    })
  })
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity()
      document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} items`;
  }
  updateCartQuantity()

  document.querySelectorAll('.js-update-link').forEach((link)=> {
    link.addEventListener('click',()=> {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    })
  })

   document.querySelectorAll('.js-save-link').forEach((save)=> {
     save.addEventListener('click',()=> {
       const productId = save.dataset.productId;
       const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
      const newQuantity = Number(quantityInput.value);

        if(newQuantity <= 0 || newQuantity > 15) {
          alert('Quantity must be at least 0 and less than 15')
          return
        } 
        updateQuantity(productId, newQuantity);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

        const quantityLable = document.querySelector(`.js-quantity-lable-${productId}`);
        quantityLable.innerHTML = newQuantity
        updateCartQuantity();
     })
   })

  

  





