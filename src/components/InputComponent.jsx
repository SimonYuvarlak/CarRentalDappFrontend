import { React, useState } from "react";
import { deposit } from "../Web3Client";

const InputComponent = (props) => {
  const [balance, setBalance] = useState("");

  const creditAccount = () => {
    console.log("adding token to your account");
    deposit(balance);
  };

  const handleBalanceChange = (event) => {
    setBalance(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="">
      <div className="grid grid-flow-row md:grid-flow-col   items-center gap-4">
        <p className="text-xl font-bold py-2 my-2 text-center text-white">
          {props.label}
        </p>
        <input
          className="border border-black rounded-md py-2 mb-2 my-2 m-auto"
          placeholder={props.holder}
          onChange={handleBalanceChange}
        />
        <button
          onClick={() => {
            creditAccount();
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 py-2 w-40 rounded-lg my-4 m-auto hover:bg-green-500"
        >
          <span className="text-white text-lg font-semibold">Submit</span>
        </button>
      </div>
    </div>
  );
};

export default InputComponent;
