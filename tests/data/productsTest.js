import { Product, Clothing, Appliances  } from "../../data/products.js";
import { fromatCurrency } from "../../scripts/utils/money.js";

describe('suit: Product',()=> {
  let product;

  beforeEach(()=> {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });

  });

  it('has correct properties',()=> {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
    expect(product.priceCents).toEqual(1090);
  });

  it('gets the stars url',()=> {
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });

  it('get the price',()=> {
    expect(product.getPrice()).toEqual(fromatCurrency(1090));
  });

  it('it does not display extra info',()=> {
    expect(product.extraInfoHTML()).toEqual('');
  });


});



describe('suit: Clothing',()=> {
  let clothing;

  beforeEach(()=> {
    clothing = new Clothing({
      id: "e43638ce-1d07eb678c6",
      image: "images/products/blue-jacket.jpg",
      name: "Men Blue Denim Jacket",
      rating: {
        stars: 4.5,
        count: 9090
      },
      priceCents: 4546,
      keywords: [
        "menjacket",
        "bluedenim",
        "jacket"
      ],
      type: "clothing",
      sizeChartLink: "/images/clothing-size-chart.png"
      
    });

  });

  it('has a correct propertie',()=> {
    expect(clothing.id).toEqual("e43638ce-1d07eb678c6");
    expect(clothing.image).toEqual("images/products/blue-jacket.jpg");
    expect(clothing.sizeChartLink).toEqual("/images/clothing-size-chart.png");
  });

  it('get the stars url',()=> {
    expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });

  it('get the price',()=> {
    expect(clothing.getPrice()).toEqual(fromatCurrency(4546));
  });

  it('displays a size chart link in extraInfoHTML',()=> {
    expect(clothing.extraInfoHTML()).toContain(`<a href="/images/clothing-size-chart.png" target=_blank>Size chart
    </a>`); //while checking the multiple lines of string use "toContain method".
  });

  it('displays a size chart',()=> {
    expect(clothing.sizeChartLink).toContain("/images/clothing-size-chart.png");
  });

});


describe('suite: appliances',()=> {
  let appliance;

  beforeEach(()=> {
    appliance = new Appliances ({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructions: "images/appliance-instructions.png",
      warranty: "images/appliance-warranty.png"
    });
  });

  it('has the correct properties',()=> {
    expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(appliance.image).toEqual("images/products/black-2-slot-toaster.jpg");
    expect(appliance.instructions).toEqual("images/appliance-instructions.png");
    expect(appliance.warranty).toEqual("images/appliance-warranty.png");
  });

  it('get the stars url',()=> {
    expect(appliance.getStarsUrl()).toEqual("images/ratings/rating-50.png");
  });

  it('get the price',()=> {
    expect(appliance.getPrice()).toEqual(fromatCurrency(1899));
  });

  it('display instructions and warranty',()=> {
   expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-instructions.png" target=_blank>`);
   expect(appliance.extraInfoHTML()).toContain('Instructions');

   expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-warranty.png" target=_blank>`);
   expect(appliance.extraInfoHTML()).toContain('Warranty');
  });


})