import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import {fromatCurrency} from "../utils/money.js";
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOption.js';
import {renderPaymentSummary} from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary() {
  let cartSummaryHtml = '';

  cart.forEach((cartItem)=> {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHtml += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price
            js-product-price-${matchingProduct.id}
          ">
          &#8377 ${fromatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity
            js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-lable-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
              </span>
              <input type="number" min="1" max="15" class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link
            js-delete-link-${matchingProduct.id}" 
            data-product-id='${matchingProduct.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
        ${deliveryOptionHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption)=> {

      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        :`&#8377 ${fromatCurrency(deliveryOption.priceCents)} -`; //return value & stored into priceString.

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      html +=`
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
        ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
          ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml

  document.querySelectorAll('.js-delete-link').forEach((link)=> {
    link.addEventListener('click',()=> {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    renderOrderSummary(); 
    renderCheckoutHeader();
    renderPaymentSummary();
    })
  })
  
  renderCheckoutHeader();

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
        renderOrderSummary();
        renderCheckoutHeader();
        renderPaymentSummary();
    })
  })

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=> {
    element.addEventListener('click',()=> {
      const {productId, deliveryOptionId} = element.dataset
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); //recursion-function.
      renderPaymentSummary(); //reGenrating the html.
    })
  })
}








