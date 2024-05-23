import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage() {
  await loadProductsFetch();

  const value = await new Promise((resolve)=> {
    loadCart(()=> {
      resolve();
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
};
loadPage();


/*
Promise.all([ //onces the all promise's completed, it's go to next step to then.
  loadProductsFetch(),
  new Promise((resolve)=> {
    loadCart(()=> {
      resolve();
    });
  })
]).then((value)=> {
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
promise without promise all method.
new Promise((resolve)=> {
  loadProducts(()=> {
    resolve('value1'); //resolve moves to the next step means to then method.
  });

}).then((value)=> {
  console.log(value);

  return new Promise((resolve)=> {
    loadCart(()=> {
      resolve();
    });
  });

}).then(()=> {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
})
*/

/*
//callback code.
loadProducts(()=> { 
  //below functions are in a anonymous function passing into loadProducts funtion as parameters to load the cart products.
  loadCart(()=> { //this is callback inside a callback lead's to callback hell.
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/


