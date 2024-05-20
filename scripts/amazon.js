  import {cart,addToCart,calculateCartQuantity} from '../data/cart.js';
  import {products, loadProducts} from '../data/products.js';
  import {fromatCurrency} from './utils/money.js';


  loadProducts(renderProductsGrid); //passing the function as parameter to the loadProducts function.
  //why we do this means, due to the asynchronous(waiting) of products coming from supersimple backend.
  
  function renderProductsGrid() {

    //products from products.js.('it run's first because of products.js was in first)
    let productsHTML = ''; 

    products.forEach((product) => { //every single product  
      productsHTML += 
      `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
      ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src=${product.getStarsUrl()}>
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
      &#8377 ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-checkmark${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`
    }); //adding into the productsHTML using accumlater pattern

    document.querySelector('.js-products-grid').innerHTML = productsHTML; //targeting the div and add the genratingHTML 

    //addTocart function moved into cart.js file because it related to cart file by using the modules we importing the addToCart function

    function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity()
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
    updateCartQuantity()

    document.querySelectorAll('.js-add-to-cart').forEach((button)=> {
      button.addEventListener('click',() => {
        const {productId} = button.dataset; 
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)
        const quantity = Number(quantitySelector.value)
        addToCart(productId,quantity);
        //dataset method to get data from html data attribute
        //productId: button.dataset.productId {Destructuring}
        updateCartQuantity();


        //This block for added check png
        const addedCheck = document.querySelector(`.js-added-checkmark${productId}`)
        addedCheck.classList.add('added-to-cart-visible');

        const intervalId = setTimeout(()=> {
          addedCheck.classList.remove('added-to-cart-visible');
        },2000)
      });
    });
};
  


