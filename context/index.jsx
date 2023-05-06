import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xAA736B8a7B92c0Ec3CF33C8B1E803cc5d952e6A8"
  );

  const { mutateAsync: addPost } = useContractWrite(contract, "addPost");
  const { mutateAsync: addTestimony, isLoading } = useContractWrite(
    contract,
    "addTestimony"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishPost = async (form) => {
    try {
      const data = await addPost([
        String(form.title),
        String(form.type),
        String(form.desc),
        String(new Date(form.time).getTime()),
        String(form.location),
      ]);

      console.log("Contract call successful", data);
    } catch (err) {
      console.log("contract call failure\n", err);
    }
  };

  const publishTestimony = async (form) => {
    try {
      const data = await addTestimony([
        form.title,
        form.desc,
        form.time,
        form.location,
        form.postid,
      ]);
      console.log("Contract call successful", data);
    } catch (err) {
      console.log("contract call failure\n", err);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        createPost: publishPost,
        createTestimony: publishTestimony,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
