import { useEffect, useState } from "react";
import metadata from "../utils/contract.json";
import { useTx, useContract } from "useink";
import * as U from "useink/utils";
import { ToastContainer } from "react-toastify";
import { getAccountAddress } from "../services/getAccount";
import { Button } from "antd";
import { notifyError, notifySuccess } from "../utils/toastify";
import { callApiCreate } from "../services/callApiCreate";
import { useDispatch } from "react-redux";
import { setStateDeposit, setStateLeaderboard } from "../redux/stateCampaign";
import { useLocation } from "react-router-dom";

function DepositPayout({ amount, setValue, categoryToken, valueSetup, valueQuest, valueReward }) {
  const CONTRACT_ADDRESS_ALPHE = import.meta.env.VITE_CONTRACT_ADDRESS_ALEPH;
  const alpheContract = useContract(CONTRACT_ADDRESS_ALPHE, metadata, "aleph-testnet");
  const [isFlagDeposit, setIsFlagDeposit] = useState(false);
  const alpheDeposit = useTx(alpheContract, "deposit");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDeposit = async () => {
    if (!checkConnectWallet()) {
      return;
    }
    if (isFlagDeposit) {
      // setValue("Leaderboard");
      // //call api
      // callApiCreate(valueSetup, valueQuest, valueReward);
      // dispatch(setStateDeposit(true));
      // dispatch(setStateLeaderboard(true));
    } else {
      alpheDeposit.signAndSend([], { value: amount });
    }
  };

  const checkConnectWallet = (currentAccount) => {
    const account = getAccountAddress();
    if (!account) {
      notifyError("Please connect wallet first!");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (U.isInBlock(alpheDeposit)) {
      setIsFlagDeposit(true);
      notifySuccess("Deposit Successfully!");
    }
    if (isFlagDeposit) {
      setValue("Leaderboard");
      //call api
      callApiCreate(valueSetup, valueQuest, valueReward);
      dispatch(setStateDeposit(true));
      dispatch(setStateLeaderboard(true));
    }
  }, [U.isInBlock(alpheDeposit)]);

  return (
    <div className="">
      <p className="text-[16px] md:text-[20px] font-semibold text-white py-4 px-4 rounded-lg borderBlue">
        You have {!location.pathname.includes("detail") ? "to deposit" : "deposited "}
        <span className="text-yellow-600">
          {amount} {categoryToken}
        </span>{" "}
        to the smartcontact
      </p>
      <ToastContainer />
      {!location.pathname.includes("detail") ? (
        <Button
          loading={U.shouldDisable(alpheDeposit)}
          disabled={U.shouldDisable(alpheDeposit)}
          onClick={handleDeposit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded relative left-[50%] -translate-x-[50%]  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center"
        >
          {isFlagDeposit ? "Next" : U.shouldDisable(alpheDeposit) ? "Depositing" : "Deposit"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default DepositPayout;
