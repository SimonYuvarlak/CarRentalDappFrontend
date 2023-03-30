// Css
import "./App.css";
// Local Components
import bgImg from "./assets/background.jpg";
import InfoBox from "./components/InfoBox";
import TopLabel from "./components/TopLabel";
import Status from "./components/Status";
import InputComponent from "./components/InputComponent";
import Header from "./components/Header";
import CarComponent from "./components/CarComponent";
import Modal from "./components/UI/Modal";
import GradientButton from "./components/reusables/GradientButton";
import AdminActions from "./components/AdminActions";
import DueComponent from "./components/DueComponent";
import {
  init,
  getUserAddress,
  activateCar,
  addCar,
  checkIn,
  checkOut,
  deActivateCar,
  deposit,
  makePayment,
  register,
  setCarManagerAddress,
  setCarManagerOwner,
  setOwner,
  setUserManagerOwner,
  getAllCars,
  getCar,
  getCarManager,
  getOwner,
  getUserBalance,
  getUserDebt,
  getUserManager,
  isCarActive,
  login,
} from "./Web3Client";
// Assets
import car1 from "./assets/car1.jpg";
import car2 from "./assets/car2.jpg";
import car3 from "./assets/car3.jpg";
// External exports
import { BiWalletAlt, BiTimeFive } from "react-icons/bi";
import { GiToken } from "react-icons/gi";
import { useState, useEffect } from "react";
import Web3 from "web3";

const DUMMY_CARS = [
  {
    id: "1",
    isActive: true,
    carFee: "BNB 50",
    saleFee: "BNB 100",
    carImg: car1,
  },
  {
    id: "2",
    isActive: false,
    carFee: "BNB 45",
    saleFee: "BNB 95",
    carImg: car2,
  },
  {
    id: "3",
    isActive: true,
    carFee: "BNB 65",
    saleFee: "BNB 85",
    carImg: car3,
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({
    walletaddress: "",
    name: "",
    lastname: "",
    rentedCarId: 0,
    balance: 0,
    debt: 0,
    start: 0,
    end: 0,
  });
  const [cars, setCars] = useState([]);
  const [name, setName] = useState({});
  const [lastName, setLastName] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCredit, setUserCredit] = useState(0);
  const [due, setDue] = useState(0);
  const [isAvailable, setIsAvailable] = useState("Can Rent");
  // const [car, setCar] = useState({ id: 0, name: '', imgUrl: '', availableforRent: false, rentFee: 0, saleFee: 0 });

  const emptyAddress = "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    const handleInit = async () => {
      let isAUser = await login();
      console.warn(isAUser);
      // If the user exists
      if (isAUser.address != emptyAddress) {
        setLoggedIn(true); //login user
        // set user credits
        setUserCredit(Web3.utils.fromWei(String(isAUser.balance), "ether"));
        // set user due
        setDue(Web3.utils.fromWei(String(isAUser.debt), "ether"));
        // set user name
        setUserName(isAUser.name);
        // set the user
        setUser(isAUser);
        // get the user address
        let address = await getUserAddress();
        // get the owner
        let owner = await getOwner();
        // see if the user is the owner
        console.log(`admin: ${owner} and user ${address}`);
        if (address === owner) {
          setOwner(true);
        }
        // get cars
        let carArray = await getAllCars();
        await getCars(carArray);
        // update user status
        if (isAUser.rentedCarId != 0) {
          let rentedCar = await getCar(isAUser.rentedCarId);
          setIsAvailable(`Rented ${rentedCar.name} - ${rentedCar.id}`);
        } else {
          console.log(isAUser.debt);
          if (isAUser.debt != 0) {
            setIsAvailable("Pay your due before renting again!");
          }
        }
      }
    };

    handleInit();
  }, []);

  const getCars = async (cars) => {
    let carArr = [];
    cars.forEach(async (element) => {
      let car = await getCar(element);
      carArr.push({
        id: car.id,
        name: car.name,
        imgUrl: car.imgUrl,
        availableForRent: car.availableForRent,
        rentFee: car.rentFee,
        saleFee: car.saleFee,
      });
      setCars(carArr);
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <div className="h-full bg-[url('./assets/background.jpg')]  bg-cover bg-center  bg-no-repeat ">
      {/* Header */}
      <Header loggedIn={loggedIn} />
      {/* Title */}
      {loggedIn ? (
        <div>
          <div className="mt-12">
            <TopLabel userName={userName} />
          </div>
          {/* <div className="grid place-content-center mt-8">
            {isAdmin && (
              <GradientButton
                // onClick={() => setShowModal(true)}
                onClick={() => {
                  addCar();
                }}
                title="Admin Actions"
              />
            )}
          </div> */}
          {/* Data Section */}
          <div className=" mx-auto grid place-content-center  mt-12">
            <div className="flex flex-row items-center">
              <div className="grid grid-flow-row md:grid-flow-col  items-center">
                <InfoBox
                  label="BNB Credit"
                  number={userCredit}
                  icon={<BiWalletAlt />}
                />
                <InfoBox label="BNB Due" number={due} icon={<GiToken />} />
                <InfoBox
                  label="Ride Minutes"
                  number="0"
                  icon={<BiTimeFive />}
                />
                <div className="grid place-items-center">
                  <Status status={isAvailable} />
                </div>
              </div>
            </div>
          </div>
          {/* Input Section */}
          <div className="place-content-center  grid items-center p-4 mt-12">
            <InputComponent
              holder=" Credit balance"
              label="Credit your account"
            />
            <DueComponent label="Pay your due" onClick={() => makePayment()} />
          </div>
          {/* Car Section */}
          <div className="grid md:grid-flow-col gap-4 gap-y-12 justify-evenly mt-24 pb-24">
            {cars.length > 0
              ? cars.map((car) => (
                  <div key={car.id}>
                    <CarComponent
                      isActive={car.availableForRent}
                      carFee={car.rentFee}
                      saleFee={car.saleFee}
                      image={car.imgUrl}
                      id={car.id}
                    />
                  </div>
                ))
              : DUMMY_CARS.map((car) => (
                  <div key={car.carId}>
                    <CarComponent
                      isActive={car.isActive}
                      carFee={car.carFee}
                      saleFee={car.saleFee}
                      image={car.carImg}
                      id={car.id}
                    />
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-screen text-white  w-full">
            <div className=" p-4 mt-10 grid place-content-center">
              <h1 className="text-2xl font-bold text-center">Login To Dab</h1>
              <h3 className="text-center mt-4">
                Enter your Address key to Login or Register
              </h3>
              <div className="grid mb-8 mt-4 grid-flow-row">
                <input
                  className="p-2 mb-4 text-black rounded-md"
                  placeholder="Enter your Name"
                  onChange={handleNameChange}
                />
                <input
                  className="p-2 mb-4 text-black rounded-md"
                  placeholder="Enter your Surname"
                  onChange={handleLastNameChange}
                />
                <GradientButton
                  title="Register"
                  onClick={() => {
                    register(name, lastName);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showModal && (
        <Modal close={() => setShowModal(false)}>
          <AdminActions />
        </Modal>
      )}
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
