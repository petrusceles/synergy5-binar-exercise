// app.example.js
async load() {
  // Contoh aja filternya cuma type
  const type = document.getElementById("type");

  const cars = await Binar.listCars({ type: type });
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
    if (filterer.type) return car.type === filterer.type;
    else return car
  });
}

