import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { renderCheckoutHeader } from "../../scripts/checkout/checkoutHeader.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suit: renderOrderSummary', ()=> { 
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  afterEach(()=> { //this hook run last of every test.
    document.querySelector('.js-test-summary').innerHTML = '';
  });

  beforeAll((done)=> { //beforeAll hoke run all the function first.
    loadProductsFetch().then(()=> {
      done(); //done is bulit in method of jasmin to wait for some time, by using this method to get the products from backend.
    });
  });

  beforeEach(()=> { //this hook run starting of every test.
    spyOn(localStorage, 'setItem'); //after delete the some items form cart it save the remaing items.

    document.querySelector('.js-test-summary').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-checkout-header"></div>
    <div class="js-payment-summary"></div>
  `;//creating div in orderSummaryTest.html file. 
    //inserting the orderSummary and inserting the checkout header. 

  spyOn(localStorage, 'getItem').and.callFake(()=> { //creating fake cart in local storage with 2 products.
    return JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]);
  });

  loadFromStorage();
  renderOrderSummary();
  renderPaymentSummary();

  })


  it('display the cart', ()=> {
    //here the beforEach will run
    expect (
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2); //checking the products length in cart.
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2'); //checking the cart quantity of product 1
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1'); //checking the cart quantity of product 2

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    //afterEach() hook will run
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('₹ 10.90')
  });



  it('remove a products',()=> {
    //here the beforEach will run
    expect(
      document.querySelector(`.js-delete-link-${productId1}`).click()
    );
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-delete-link-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-delete-link-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1); 
    expect(cart[0].productId).toEqual(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('₹ 20.95');
    //afterEach() hook will run
    })
})