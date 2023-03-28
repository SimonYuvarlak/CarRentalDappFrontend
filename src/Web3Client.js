import Web3 from "web3";
import RenterABI from "./ABI/RentalPlatform.json";

let selectedAccount;
let renterContract;
let isInitialized = false;
let renterContractAddress = "0x447F746d1c13890ae3210f608426829556cB956d";

export const init = async () => {
    // Configure contract
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      provider.request({ method: 'eth_requestAccounts'})
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      })
    }

    window.ethereum.on('accountChanged', function (accounts) {
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
    });

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    renterContract = new web3.eth.Contract(RenterABI.abi, renterContractAddress);

    isInitialized = true;
}

export const getUserAddress = async() => {
    if (!isInitialized) {
        await init();
    }
    return selectedAccount;
}

// Execute Functions

export const register = async (name, surname) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.addUser(selectedAccount, name, surname).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const activateCar = async (id) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.activateCar(id).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const addCar = async (id, name, url, rentFee, saleFee) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.addCar(id, name, url, rentFee, saleFee).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const checkIn = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.checkIn(selectedAccount).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const checkOut = async (id) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.checkOut(selectedAccount, id).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const deActivateCar = async (id) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.deActivateCar(id).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const deposit = async (value) => {
    if (!isInitialized) {
        await init();
    }
    let send_value = Web3.utils.toWei(value, 'ether');
    let res = await renterContract.methods.deposit(selectedAccount).send( {from: selectedAccount, value: send_value} );
    console.log(res);
    return res;
}

export const makePayment = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.makePayment(selectedAccount).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

export const setOwner = async (newOwner) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.setOwner(newOwner.toLowerCase()).send( {from: selectedAccount} );
    console.log(res);
    return res;
}

// Query functions

export const getAllCars = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getCarIds().call();
    console.log(res);
    return res;
}

export const getCar = async (id) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getCar(id).call();
    console.log(res);
    return res;
}

export const getCarManager = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getCarManager().call();
    console.log(res);
    return res;
}

export const getUserBalance = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getUserBalance(selectedAccount).call();
    console.log(res);
    return res;
}

export const getUser = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getUser(selectedAccount).call();
    console.log(res);
    return res;
}

export const getUserDebt = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getUserDebt(selectedAccount).call();
    console.log(res);
    return res;
}

export const isCarActive = async (id) => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.isCarActive(id).call();
    console.log(res);
    return res;
}

export const getOwner = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.getOwner().call();
    console.log(res);
    return res.toString();
}

export const login = async () => {
    if (!isInitialized) {
        await init();
    }
    let res = await renterContract.methods.isUser(selectedAccount).call();
    console.log(res);
    return res;
}