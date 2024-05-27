import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateCartQuantity } from "../data/cart.js";



async function loadPage() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId'); 

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails = '';
  order.products.forEach((details)=>{
    if(product.id === details.productId) {
      productDetails = details;
    }
  });

  const trackingHTML =`
    <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>
    <div class="delivery-date">
      Arriving on ${
        dayjs('2024-05-30T08:20:41.654Z').format('dddd, MMMM DD')
      }
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
    <div class="progress-label">
      Preparing
    </div>
    <div class="progress-label current-status">
      Shipped
    </div>
    <div class="progress-label">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar"></div>
  </div> 
  </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

}

loadPage();



