import React, { useState } from "react";
import SubSelector from "../sub/SubSelector";
import axios from "axios";
import { BACKEND } from "../../lib/const";
export default function Selector({ setCars }) {
  //state declarations
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passenger, setPassenger] = useState("");
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
    setPassenger(value);
  };
  const onClickFindCar = async (e) => {
    e.preventDefault();
    try {
      let queryObject = {};
      if (date && time) queryObject["availableAt"] = date + " " + time;
      if (passenger) queryObject["passenger"] = passenger;
      let responseCars = await axios.get(
        `${BACKEND.URL}/api/car`,
        {
          params: queryObject,
        }
      );
      let retrievedCars = responseCars.data.data.retrieved_car;
      setCars(retrievedCars)
      // console.log(retrievedCars);

      // retrievedCars.forEach((e) => {
      //   console.log(
      //     new Date(e.availableAt) <= new Date(queryObject.availableAt)
      //   );
      // });
      // }
      // console.log(retrievedCars);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-wrap w-10/12 justify-center items-center px-10 py-5 gap-20 shadow-lg bg-white rounded-md">
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
        <div className=" w-1/5 min-w-[200px] justify-center flex flex-wrap gap-2">
          <p className="w-full font-light text-white">target</p>
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
