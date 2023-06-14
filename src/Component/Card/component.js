import React from "react";
function Card(props) {
  const { background, title, icon, className, bg, subtitle, onClick  } = props;
  return (
    <div className={`flex flex-wrap border-2 border-gray-200 rounded-lg p-4 ${background}  ${className} shadow-md bg-${bg} bg-cover bg-center w-[450px] h-[200px] cursor-pointer`} onClick={onClick}>
      <div className="flex justify-between w-full items-center ">
        <div className="flex flex-col">
          <h1 className="text-[32px] text-white font-mono">{title}</h1>
          <h1 className="text-[24px] text-black font-bold">{subtitle}</h1>
        </div>
        <div className="flex flex-col">
          <div className=" bg-gray-200 rounded-full w-[70px] h-[70px] flex justify-center items-center">
            <img src={icon} alt="hot" className="w-[50px] h-[50px]" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;