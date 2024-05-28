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

  const todayDate = dayjs();
  const orderDate = dayjs(order.orderTime);
  const deliveryDate = dayjs(productDetails.estimatedDeliveryTime);
  const progressPercent = ((todayDate - orderDate) / (deliveryDate - orderDate)) * 100;

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
    <div class="progress-label ${
      progressPercent < 50 ? 'current-status' : ''
    }">
      Preparing
    </div>
    <div class="progress-label ${
      progressPercent >= 50 ? 'current-status' : ''
    }">
      Shipped
    </div>
    <div class="progress-label ${
      progressPercent >= 100 ? 'current-status' : ''
    }">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width: ${progressPercent}%"></div>
  </div> 
  </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

}

loadPage();



