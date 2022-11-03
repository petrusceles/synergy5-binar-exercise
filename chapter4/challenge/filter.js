// app.example.js
async load() {
  // Contoh aja filternya cuma type
  const type = document.getElementById("type");
  const passengerCount = document.getElementById("passenger-count");

  const filterer = { type: type.value, passengerCount: passengerCount.value }

  const cars = await Binar.listCars(filterer);
  Car.init(cars);
}

// Binar.js
static async listCars(filterer) {
  let cars;
  let cachedCarsString = localStorage.getItem("CARS");

  if (!!cachedCarsString) {
    const cacheCars = JSON.parse(cachedCarsString);
    cars = this.populateCars(cacheCars);
  } else {
    const response = await fetch(
      "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
    );
    const body = await response.json();
    cars = this.populateCars(body)

    localStorage.setItem("CARS", JSON.stringify(cars));
  }

  return cars.filter((car) => {
    // Contoh aja filternya cuma type
    if (filterer.type && filterer.passengerCount)
      return car.type === filterer.type && car.passengerCount === filterer.passengerCount;
    else if (filterer.type)
      return car.type === filterer.type;
    else if (filterer.passengerCount)
      return car.passengerCount === filterer.passengerCount;
    else return car
  });
}

