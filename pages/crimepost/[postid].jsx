import CrimeMain from "@/components/CrimeMain";
import Header from "@/components/Header";
import Testimonies from "@/components/Testimonies";
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState, createContext, useContext } from "react";
import { InfoContext } from "@/pages/_app";
import Head from "next/head";

const Postpage = () => {
  const router = useRouter();
  const postId = router.query.postid;
  const { state, account } = useContext(InfoContext);
  const { provider, signer, contract } = state;
  const [address, setAddress] = useState();

  useEffect(() => {
    setAddress(account[0]);
  }, [account]);
  return (
    <>
      <Head>
        <title>Informant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`bg-black text-white pb-3 scrollbar-none ${
          address == "0xdd4ccad145e08bd0d1224a2a7e72b7e4f1374655"
            ? "h-[155vh]"
            : "h-[110vh]"
        } overflow-hidden  px-10 space-y-5 flex flex-col `}
      >
        <Header />
        <CrimeMain postid={postId} />

        {/* If admin address only then show testimonies else don't */}
        {address == "0xdd4ccad145e08bd0d1224a2a7e72b7e4f1374655" && (
          <>
            <div className="inline-flex items-center justify-center w-full space-x-5">
              <hr className="w-[250px]" />
              <p className="text-xl italic">Testimonies</p>
              <hr className="w-[250px]" />
            </div>
            <Testimonies postid={postId} />
          </>
        )}
      </div>
    </>
  );
};

export default Postpage;
