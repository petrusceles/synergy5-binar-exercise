import React from "react";

export default function SubSelector({ title, type, onChangeListener }) {
  return (
    <div className=" w-1/5 min-w-[200px] flex flex-wrap gap-2">
      <p className="w-full font-light">{title}</p>
      <input
        type={type}
        className="w-full py-2 px-4 border-2 border-slate-300 rounded"
        onChange={(event) => onChangeListener(event)}
      />
    </div>
  );
}
