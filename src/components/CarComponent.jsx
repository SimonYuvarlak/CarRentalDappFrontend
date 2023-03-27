import React from "react";
import { checkOut, checkIn } from "../Web3Client";

const CarComponent = (props) => {


  return (
    <div className="border-md border-black flex flex-col">
      <img src={props.image} alt="car image" className="w-80 h-60" />
      <p className="w-80 text-white text-lg mt-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet.
      </p>
      <div className="text-white space-y-4 text-xl mt-4">
        <p >Rent Fee: {props.carFee}</p>
        <p >Sale Fee: {props.saleFee}</p>
        <p className={props.isActive ? "text-green-500" : "text-red-300"}>{props.isActive ? "Active" : "Inactive"}</p>
      </div>
      <div className="flex flex-row justify-evenly mt-10">
        <button onClick={() => checkOut(props.id)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 py-2 w-20 m-1 rounded-lg my-4 m-auto hover:bg-green-500">
          <span className="text-white text-sm p-1">Check out</span>
        </button>
        <button onClick={() => checkIn(props.id)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 py-2 w-20 m-1 rounded-lg my-4 m-auto hover:bg-green-500">
          <span className="text-white text-sm p-1">Check in</span>
        </button>
      </div>
    </div>
  );
};

export default CarComponent;
