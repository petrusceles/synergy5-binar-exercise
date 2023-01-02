import React from "react";

export default function SubSelector({ title, type, onChangeListener }) {
  return (
    <div className=" w-10/12 min-w-[200px] grid grid-rows-2 gap-2 lg:w-1/5 items-center">
      <p className="w-full font-light">{title}</p>
      <input
        type={type}
        className="w-full py-2 px-4 border-2 border-slate-300 rounded"
        onChange={(event) => onChangeListener(event)}
      />
    </div>
  );
}
