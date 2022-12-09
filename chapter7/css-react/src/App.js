import Car from "./components/Car";
import { useState } from "react";
function App() {
  const [cars, setCars] = useState([])
  const [carName, setCarName] = useState("");
  const [carPrice,setCarPrice] = useState(0);
  const [carYear,setCarYear] = useState(0);
  const [carImage,setCarImage] = useState("");

  const carNameHandler = (event) => {
    const value = event.target.value;
    if (value) setCarName(value);
  }

  const carPriceHandler = (event) => {
    const value = event.target.value;
    if (value) setCarPrice(value);
  }

  const carYearHandler = (event) => {
    const value = event.target.value;
    if (value) setCarYear(value);
  }

  const carImageHandler = (event) => {
    const value = event.target.value;
    if (value) setCarImage(value);
  }

  const carsHandler = (event) => {
    event.preventDefault();
    if (carName && carPrice && carYear && carImage) setCars([...cars, {name:carName,price:carPrice,year:carYear,image:carImage}])
  }
  return (
    <>
    <div className="container flex flex-wrap mx-10 gap-12 my-10 justify-center">
      <div className="flex items-center gap-10 p-6 rounded-xl  bg-slate-50">
        <h1 className="text-7xl font-semibold text-slate-700">CARS</h1>
        <form className="flex h-[50%] gap-6">
          <input placeholder="name" className="px-3 py-1 rounded-md border-slate-200 border-2" onChange={(event) => carNameHandler(event)}/>
          <input type="number" placeholder="price" className="px-3 py-1 rounded-md border-slate-200 border-2" onChange={(event) => carPriceHandler(event)}/>
          <input placeholder="image link" className="px-3 py-1 rounded-md border-slate-200 border-2" onChange={(event) => carImageHandler(event)}/>
          <input type="number" placeholder="year" className="px-3 py-1 rounded-md border-slate-200 border-2" onChange={(event) => carYearHandler(event)}/>
          <button className="text-center align-middle py-2 px-4 rounded-lg shadow-lg bg-amber-300 focus:shadow-none transition-all duration-300" onClick={(event) => carsHandler(event)}>Add</button>
        </form>
      </div>
      {cars.map((value,index) => <Car price={value.price} name={value.name} year={value.year} image={value.image} key={index}/>)}
    </div>
    </>
  );
}

export default App;
