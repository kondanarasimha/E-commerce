class Car {
  #brand;
  #model;
  _speed;
  isTrunkOpen;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this._speed = 0;
    this.isTrunkOpen = false;
  };

  go() {
    if(!this.isTrunkOpen) {
      this._speed += 5;
    };
  };

  brake() {
    if(this._speed <= 0 || this._speed >= 200) {
      return;
    }
      this._speed -= 5;
  };

  openTrunk() {
    if(this._speed === 0) {
      this.isTrunkOpen = true;
    }
  };

  closeTrunk() {
    this.isTrunkOpen = false;
  }



  displayInfo() {
    const trunk = this.isTrunkOpen ? 'open' : 'close';
    console.log(
      `brand:${this.#brand} model:${this.#model} speed:${this._speed} km/h Trunk:${trunk}`
    );
  };
};


class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails); //we are inhertens the parent constructer.
    this.acceleration = carDetails.acceleration;
  };

  go() {
    if(this._speed >= 0 && this._speed <= 300) {
      this._speed += this.acceleration;
    }
  };

  brake() {
    if(this._speed > 0) {
      this._speed -= 5;
    }
  }
  
  openTrunk() {
    console.log('Race cars do not have a trunk');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk');
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 150
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.brake();
car2.displayInfo();


car1.openTrunk();
car1.closeTrunk();
car1.go();
car1.brake();

car1.displayInfo();

car2.go();
car2.closeTrunk();
car2.displayInfo();


raceCar.go();
raceCar.displayInfo();




