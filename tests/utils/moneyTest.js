import { fromatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrcey',()=> {
  it('converts cents into dollars',()=> {
    expect(fromatCurrency(2095)).toEqual('20.95');
  });

  it('work with 0',()=>{
    expect(fromatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearst cent',()=> {
    expect(fromatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearst cent',()=> {
    expect(fromatCurrency(2000.4)).toEqual('20.00');
  });

  it('work with negative cents',()=> {
    expect(fromatCurrency(-500)).toEqual('-5.00');
  })

});


