import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND } from "../../lib/const";
import { useNavigate } from "react-router-dom";
export default function Car({
  id,
  name,
  price,
  updatedAt,
  pictureUrl,
  setCar,
}) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  const [updatedAtDate, setUpdatedAtDate] = useState(new Date());

  //button handlers
  const onClickDelete = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${BACKEND.URL}/api/car/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const carResponse = await axios.get(`${BACKEND.URL}/api/car`);
      const retrievedCars = carResponse.data.data.retrieved_car;
      setCar(retrievedCars);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setUpdatedAtDate(new Date(updatedAt));
    console.log(updatedAtDate);
  }, []);
  return (
    <>
      <div className="flex">
        <div className="flex flex-wrap justify-center rounded-sm shadow-md h-fit">
          <img
            src={pictureUrl}
            className="w-full h-4/6 min-h-[270px] max-h-3 object-cover object-center rounded-t-md"
          />
          <div className="w-full px-5 py-4 flex flex-wrap">
            <p className="w-full py-1">{name}</p>
            <p className="w-full py-1 font-semibold text-lg">{`Rp ${price}/hari`}</p>
            <div className="w-full flex items-center pt-3">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 6C12.5523 6 13 6.44772 13 7V11.5858L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V7C11 6.44772 11.4477 6 12 6Z"
                  fill="#0D0D0D"
                ></path>
              </svg>
              <p className="pl-2 text-sm">{`Updated at ${updatedAtDate.getDate()} ${
                months[parseInt(updatedAtDate.getMonth()) - 1]
              } ${updatedAtDate.getFullYear()}, ${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}`}</p>
            </div>
            <div className="w-full flex mt-5">
              <div className="w-1/2 flex justify-start">
                <button
                  className="px-10 py-2 w-11/12 border-2 border-green-400"
                  onClick={(event) => onClickDelete(event)}
                >
                  Delete
                </button>
              </div>
              <div className="w-1/2 flex justify-end">
                <button className="px-10 py-2 w-11/12 border-2 border-green-400">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
