// Css
import "./App.css";
// Local Components
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
  const [userInfo, setUserInfo] = useState({
    balance: 0,
    debt: 0,
    rentalTime: 0,
  });
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
  // const [car, setCar] = useState({ id: 0, name: '', imgUrl: '', availableforRent: false, rentFee: 0, saleFee: 0 });

  // 1, "Audi", "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg", 100000,  1000000000000
  const add_car = () => {
    addCar(1, "Audi", "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg", 100000000000000, 100000000000000);
  }

  const emptyAddress = "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    const handleInit = async () => {
      let isAUser = await login();
      console.warn(isAUser)
      if (isAUser.address != emptyAddress) {
        setLoggedIn(true);
        setUserInfo({
          balance: isAUser.balance,
          debt: isAUser.debt,
          rentalTime: isAUser.rentalTime,
        });
        setUserName(isAUser.name);
        setUser(isAUser);

        let address = await getUserAddress();
        let owner = await getOwner();
        console.log(`admin: ${owner} and user ${address}`);
        if (address === owner) {
          setOwner(true);
        }
      }
      let carArray = await getAllCars();
      setCars(carArray);
      console.log(`user credits ${userInfo.balance}`);
      setUserCredit(Web3.utils.fromWei(String(userInfo.balance), 'ether'));
    };

    handleInit();

    console.log("0x036139E1f57b7bB3a759b4527B005b7477780dF0".toLowerCase());
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <div className="h-full  bg-[url('https://img.freepik.com/free-vector/gradient-cyber-futuristic-background_23-2149117429.jpg?w=1380&t=st=1679801070~exp=1679801670~hmac=3f3ac00783fdf3f4fcdfd32442f116250b809a1b3bb0f74f2777c4ba08f82609')] bg-cover bg-center  bg-no-repeat ">
      {/* Header */}
      <Header loggedIn={loggedIn} />
      {/* Title */}
      {loggedIn ? (
        <div>
          <div className="mt-12">
            <TopLabel userName={userName} />
          </div>
          <div className="grid place-content-center mt-8">
            {isAdmin && (
              <GradientButton
                // onClick={() => setShowModal(true)}
                onClick={() => {add_car()}}
                title="Admin Actions"
              />
            )}
          </div>
          {/* Data Section */}
          <div className=" mx-auto grid place-content-center  mt-12">
            <div className="flex flex-row items-center">
              <div className="grid grid-flow-row md:grid-flow-col  items-center">
                <InfoBox
                  label="BNB Credit"
                  number={userCredit}
                  icon={<BiWalletAlt />}
                />
                <InfoBox label="BNB Due" number="0" icon={<GiToken />} />
                <InfoBox
                  label="Ride Minutes"
                  number="0"
                  icon={<BiTimeFive />}
                />
                <div className="w-">
                  <Status status="Available" />
                </div>
              </div>
            </div>
          </div>
          {/* Input Section */}
          <div className="place-content-center md:grid-flow-col grid items-center p-4 mt-12">
            <DueComponent label="Pay your due" />
            <InputComponent
              holder=" Credit balance"
              label="Credit your account"
            />
          </div>
          {/* Car Section */}
          <div className="grid md:grid-flow-col gap-4 gap-y-12 justify-evenly mt-24 pb-24">
            {cars.length > 0
              ? cars.map((car) => (
                  <div key={car.carId}>
                    <CarComponent
                      isActive={car.isActive}
                      carFee={car.rentFee}
                      saleFee={car.saleFee}
                      image={car.carImg}
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
              <div className="grid mb-8 grid-flow-row">
                <input
                  className="p-2 md:w-[20vw] mb-4 text-black rounded-md"
                  placeholder="Enter your Name"
                  onChange={handleNameChange}
                />
                <input
                  className="p-2 md:w-[20vw] mb-4 text-black rounded-md"
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
