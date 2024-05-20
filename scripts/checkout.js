import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

loadProducts(()=> { 
  //below functions are in a anonymous function passing into loadProducts funtion as parameters to load the cart products.
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

