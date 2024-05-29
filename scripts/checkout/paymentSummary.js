import { cart, resetCart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { fromatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;

  cart.forEach((cartItem)=> {
    const product = getProduct(cartItem.productId);
    productPriceCents += ((product.priceCents * cartItem.quantity));

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents; 
    cartQuantity += cartItem.quantity;
  })
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
        &#8377 ${fromatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money"> 
        &#8377 ${fromatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        &#8377 ${fromatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Gst tax(10%):</div>
      <div class="payment-summary-money">
        &#8377 ${fromatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      &#8377 ${fromatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary 
      js-place-order
    ">
      Place your order
    </button>
    `;

    document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHTML;


    document.querySelector('.js-place-order')
      .addEventListener('click',async()=> {
        try {

          const respones = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-type':'application/json' //it tell's more details of request.
            },
            body: JSON.stringify({
              cart: cart //backend accepts the data with a name cart, and the other cart(value) it contains the cart array.
            })
          });
  
          const order = await respones.json(); //onces the data sent to the backend it gives the respoes of the data what we send.
          addOrder(order); //The respones data was storing into the addOrder function.

        } catch(error) {
          console.log('Unexpected error. Try again later');
        }

        window.location.href = 'orders.html';
        resetCart();
      });
};