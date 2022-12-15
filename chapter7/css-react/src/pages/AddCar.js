import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { BACKEND, ROLES } from "../lib/const";
import axios from "axios";
export default function AddCar() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  //form states
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState(0);
  const [carSize, setCarSize] = useState("");
  const [carPicture, setCarPicture] = useState();

  //form handlers
  const onChangeCarName = (event) => {
    setCarName(event.target.value);
  };
  const onChangeCarPrice = (event) => {
    setCarPrice(event.target.value);
  };
  const onChangeCarSize = (event) => {
    setCarSize(event.target.value);
  };
  const onChangeCarPicture = (event) => {
    console.log(event);
    const value = event.target.files[0];

    // if (value.type !== "image/png") {
    //   console.log("Format gambar harus .png");
    // }

    setCarPicture(value);
  };

  //button handlers
  const onClickSave = async (event) => {
    event.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", carName);
      payload.append("price", carPrice);
      payload.append("size", carSize);
      payload.append("picture", carPicture);
      const token = localStorage.getItem("token");
      const headers = {
        authorization: `Bearer ${token}`,
      };

      const createCarResponse = await axios.post(
        `${BACKEND.URL}/api/car`,
        payload,
        {
          headers,
        }
      );
      if (createCarResponse.status === 201) {
        console.log("berhasil nambah");
        navigate("/admin");
      }
    } catch (err) {
      //   console.log("gagal daftar:", err);
    }
  };

  const onClickCancel = async (event) => {
    navigate("/admin");
  };

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
        // console.log(checkUserResponse);
        if (checkUserResponse.data.data.profile_user.role.id !== ROLES.ADMIN) {
          navigate("/");
        }
        setUserName(checkUserResponse.data.data.profile_user.name);
      } catch (err) {
        navigate("/login");
      }
    };

    //call function
    checkUser();
  }, []);

  return (
    <>
      <DashboardHeader userName={"Bakrie"} />
      <div className="flex flex-wrap px-20 py-3">
        <h1 className="text-2xl font-semibold pt-5 w-full">Add New Car</h1>
        <div className="felx flex-wrap w-full bg-slate-50 px-9 py-6 mt-6">
          <div className=" w-1/3 grid grid-cols-2 gap-y-9 gap-x-4">
            <div className="w-full flex items-center">
              <p>Nama</p>
            </div>
            <div>
              <input
                type={"text"}
                placeholder={"Avanza"}
                className="py-2 px-3 w-[150%]"
                onChange={(event) => {
                  onChangeCarName(event);
                }}
              />
            </div>
            <div className="w-full flex items-center">
              <p>Sewa per hari</p>
            </div>
            <div>
              <input
                type={"number"}
                placeholder={"100000"}
                className="py-2 px-3 w-[150%]"
                onChange={(event) => {
                  onChangeCarPrice(event);
                }}
              />
            </div>
            <div className="w-full flex items-center">
              <p>Ukuran</p>
            </div>
            <div>
              <input
                type={"text"}
                placeholder={"small"}
                className="py-2 px-3 w-[150%]"
                onChange={(event) => {
                  onChangeCarSize(event);
                }}
              />
            </div>
            <div className="w-full flex items-center">
              <p>Foto</p>
            </div>
            <div>
              <input
                type={"file"}
                onChange={(event) => {
                  onChangeCarPicture(event);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full py-7 gap-7">
          <button
            className="py-2 px-10 border-2 border-green-300"
            onClick={(event) => {
              onClickCancel(event);
            }}
          >
            Cancel
          </button>
          <button
            className="py-2 px-10 border-2 border-green-300"
            onClick={(event) => {
              onClickSave(event);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
