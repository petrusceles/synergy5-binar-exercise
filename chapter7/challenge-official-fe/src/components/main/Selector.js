import React, { useState } from "react";
import SubSelector from "../sub/SubSelector";
import axios from "axios";
import { BACKEND } from "../../lib/const";
export default function Selector({ setCars }) {
  //state declarations
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const onChangeDate = (e) => {
    const value = e.target.value;
    setDate(value);
  };
  const onChangeTime = (e) => {
    const value = e.target.value;
    setTime(value);
  };
  const onChangePassenger = (e) => {
    const value = e.target.value;
    setCapacity(value);
  };
  const onClickFindCar = async (e) => {
    e.preventDefault();
    try {
      let queryObject = {};
      if (date && time) queryObject["availableAt"] = date + " " + time;
      if (capacity) queryObject["capacity"] = capacity;
      let responseCars = await axios.get(`${BACKEND.URL}/api/car`, {
        params: queryObject,
      });
      let retrievedCars = responseCars.data.data.retrieved_car;
      console.log(retrievedCars);
      setCars(retrievedCars);
      // console.log(retrievedCars);

      // retrievedCars.forEach((e) => {
      //   console.log(
      //     new Date(e.availableAt) <= new Date(queryObject.availableAt)
      //   );
      // });
      // }
      // console.log(retrievedCars);
    } catch (err) {
      setCars([]);
    }
  };
  return (
    <>
      <div className="flex flex-wrap w-10/12 justify-center py-5 gap-3 items-center shadow-lg lg:px-10 lg:py-5 lg:gap-20 bg-white rounded-md ">
        <SubSelector
          title={"Tanggal"}
          type={"date"}
          onChangeListener={onChangeDate}
        />
        <SubSelector
          title={"Waktu Jemput/Ambil"}
          type={"time"}
          onChangeListener={onChangeTime}
        />
        <SubSelector
          title={"Jumlah Penumpang (optional)"}
          type={"number"}
          onChangeListener={onChangePassenger}
        />
        <div className=" w-1/5 min-w-[200px] justify-center pt-3 lg:pt-0 flex flex-wrap gap-2">
          <p className="w-full font-light text-white hidden 2xl:block">
            target
          </p>
          <button
            className="bg-green-400 w-full p-2 rounded-md border-2"
            onClick={(e) => onClickFindCar(e)}
          >
            Cari Mobil
          </button>
        </div>
      </div>
    </>
  );
}
