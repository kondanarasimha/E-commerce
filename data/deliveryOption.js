  import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


  export const deliveryOptions = [{
      id:'1',
      deliveryDays: 7, //Sunday, February 4
      priceCents: 0 //FREE Shipping
    }, {
      id: '2',
      deliveryDays: 3, //Wednesday, January 31
      priceCents: 120 //₹ 99.50 - Shipping
    }, {
      id: '3',
      deliveryDays: 1, //Monday, January 29
      priceCents: 190 //₹ 149.50 - Shipping
    }];

  export function getDeliveryOption(deliveryOptionId) {
      let deliveryOption;
        deliveryOptions.forEach((option)=> {
          if(option.id === deliveryOptionId) {
            deliveryOption = option;
          }
        });

        return deliveryOption;
  }


  export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 
        'days'
      );
      return deliveryDate.format(
        'dddd, MMMM D'
    );
  }
