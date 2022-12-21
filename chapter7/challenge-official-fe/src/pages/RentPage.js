import React, { useEffect, useState } from "react";
import Header from "../components/main/Header";
import Hero from "../components/main/Hero";
import Selector from "../components/main/Selector";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND } from "../lib/const";
import { addUser } from "../slices/userSlice";
import CarSection from "../components/main/CarSection";
import Footer from "../components/main/Footer";

export default function RentPage() {
  const dispatch = useDispatch();

  //auth states
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  //component states
  const [cars, setCars] = useState([]);

  // const onClickFindCar = async (e, query) => {
  //   e.preventDefault();
  //   try {
  //     const retrievedCars = await axios.get(`${BACKEND.URL}/api/car`, {
  //       params: {
  //         query,
  //       },
  //     });
  //     console.log(retrievedCars)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      console.log("called");
      try {
        const token = localStorage.getItem("token");

        const currentUserRequest = await axios.get(
          `${BACKEND.URL}/api/auth/me`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data.data;
        console.log(currentUserResponse);
        if (currentUserRequest.status === 200) {
          dispatch(
            addUser({
              user: currentUserResponse.profile_user,
              token: token,
            })
          );

          setUser(currentUserResponse.profile_user);
        }

        console.log(user);
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <>
      <div className="bg-blue-200 w-full">
        <div className="container mx-auto">
          <Header
            username={user.name}
            isLoggedIn={isLoggedIn}
            logout={logout}
          />
        </div>
      </div>
      <div className="pt-40 bg-blue-100">
        <div className="container mx-auto">
          <Hero isRentPage={true} />
        </div>
      </div>
      <div className="relative z-[999]">
        <div className="relative container mx-auto flex justify-center -top-10">
          <Selector setCars={setCars} />
        </div>
      </div>
      <div>
        <div className="container mx-auto flex justify-center">
          <CarSection cars={cars} />
        </div>
      </div>
      <div>
        <div className="container mx-auto flex justify-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
