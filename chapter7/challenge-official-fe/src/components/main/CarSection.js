import React, { useEffect } from "react";
import Car from "../sub/Car";
export default function CarSection({ cars }) {
  // useEffect(() => {
  //   console.log(cars)
  // },[])
  return (() => {
    if (cars.length) {
      return (
        <div className="grid grid-cols-1 px-20 py-1 gap-11 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {cars.map((e) => {
            return (
              <Car
                manufacture={e.manufacture}
                type={e.type}
                price={e.price}
                capacity={e.capacity}
                transmission={e.transmission}
                year={e.year}
                pictureUrl={e.pictureUrl}
                description={e.description}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 p-20 gap-11">
        <h2>Not Found</h2>
      </div>
    );
  })();
}
