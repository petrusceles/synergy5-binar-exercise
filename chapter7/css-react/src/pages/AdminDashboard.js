import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND, ROLES } from "../lib/const";
import { Link, useNavigate } from "react-router-dom";
import Car from "../components/Dashboard/Car";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [cars, setCars] = useState([]);

  //button handlers
  useEffect(() => {
    //function definition
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const checkUserResponse = await axios.get(
          `${BACKEND.URL}/api/auth/me`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (checkUserResponse.status !== 200) {
          navigate("/login");
        }
        console.log(checkUserResponse);
        if (checkUserResponse.data.data.profile_user.role.id !== ROLES.ADMIN) {
          navigate("/");
        }
        setUserName(checkUserResponse.data.data.profile_user.name);
      } catch (err) {
        navigate("/login");
      }
    };

    const getCars = async () => {
      const carResponse = await axios.get(`${BACKEND.URL}/api/car`);
      const retrievedCars = carResponse.data.data.retrieved_car;
      setCars(retrievedCars);
      console.log(cars);
    };

    //call function
    checkUser();
    getCars();
  }, []);

  return (
    <>
      <DashboardHeader userName={userName} />
      <div className=" flex flex-wrap px-20 auto-rows-min py-3">
        <div className="flex justify-between items-center pt-5 w-full">
          <p className="text-5xl font-semibold">List Car</p>
          <Link to={"/car/add"}>
            <button className="bg-blue-600 px-10 py-2 text-white">
              Add Car
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-start items-center gap-6 w-full py-5">
          <button className="p-1 px-8 border-2 border-green-400">All</button>
          <button className="p-1 px-8 border-2 border-green-400">Small</button>
          <button className="p-1 px-8 border-2 border-green-400">Medium</button>
          <button className="p-1 px-8 border-2 border-green-400">Large</button>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-3">
          {cars.map((e, i) => {
            return (
              <Car
                id={e.id}
                name={e.name}
                price={e.price}
                updatedAt={e.updatedAt}
                pictureUrl={e.picture_url}
                key={i}
                setCar={setCars}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
