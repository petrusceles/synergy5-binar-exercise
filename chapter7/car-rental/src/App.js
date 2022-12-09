import { useState } from 'react';
import './App.css';
import Car from './components/Car';

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
    console.log(carImage)
    if (carName && carPrice && carYear && carImage) setCars([...cars, {name:carName,price:carPrice,year:carYear,image:carImage}])
  }


  return (
    <div className="App">
      <h2>Cars</h2>
      <form>
        <input placeholder="name" onChange={(event) => carNameHandler(event)}/>
        <input type="number" placeholder="price" onChange={(event) => carPriceHandler(event)}/>
        <input placeholder="image link" onChange={(event) => carImageHandler(event)}/>
        <input type="number" placeholder="year" onChange={(event) => carYearHandler(event)}/>
        <button onClick={(event) => carsHandler(event)}>tambah car</button>
      </form>
      {cars.map((value,index) => <Car price={value.price} name={value.name} year={value.year} image={value.image} key={index}/>)}
    </div>
  );
}

export default App;
