import { useEffect, useState, createContext, useContext } from "react";

import { CubeTransparentIcon, PlusIcon } from "@heroicons/react/24/outline";
import CreatePostModal from "./CreatePostModal";
import { InfoContext } from "@/pages/_app";

// 0x800be95b215034a3cc79701793539a2abbf84dc6 -- Owner Address

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { state, account } = useContext(InfoContext);
  const { provider, signer, contract } = state;
  const [address, setAddress] = useState();

  useEffect(() => {
    setAddress(account[0]);

    // console.log(contract);
  }, [account]);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    document.getElementById("company").onmousemove = (event) => {
      let iterations = 0;
      const companyname = "INFORMANT";

      const interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return event.target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iterations >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iterations += 1 / 3;
      }, 30);
    };
  }, []);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    const eleName = document.getElementById("company");
    const interval = setInterval(() => {
      eleName.innerText = eleName.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return eleName.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= eleName.dataset.value.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  }, []);
  return (
    <>
      <header className="pt-5 flex ">
        {/* Company Logo */}
        <div className="flex items-center space-x-3">
          {/* <div className="border border-white rounded-full p-1.5">
          <div className="relative h-8 w-8 flex-shrink-0 cursor-pointer  ">
            <Link href="/">
              <Image
                src="/ilogotwo.jpg"
                fill
                style={{ objectFit: "contain" }}
                alt="logo"
              />
            </Link>
          </div>
        </div> */}

          <CubeTransparentIcon className="h-12 w-12 transition-all hover:rotate-180 hover:scale-110 ease-out" />
          <h1
            data-value="INFORMANT"
            id="company"
            className="text-4xl tracking-[6px] company-name"
          >
            INFORMANT
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex ml-auto space-x-5">
          {/* If admin address then show add post button else don't */}
          {address == "0xdd4ccad145e08bd0d1224a2a7e72b7e4f1374655" && (
            <div
              className="bg-white/5 flex items-center px-2 py-2 rounded-full hover:shadow-md hover:shadow-yellow-green/50 group"
              onClick={() => setShowModal(true)}
            >
              <PlusIcon className="h-8 w-8 bg-transparent group-hover:rotate-180 group-hover:text-yellow-green text-white/50 transition-all ease-out" />
            </div>
          )}

          <button
            className={`bg-white/5 ${
              address ? "text-yellow-green" : "text-white/70"
            } flex items-center space-x-2  rounded-lg px-2.5 py-2 hover:bg-dark-green hover:text-yellow-green hover:shadow-sm hover:shadow-yellow-green hover:-translate-y-1`}
            // onClick={() => {
            //   if (!address) connect();
            // }}
          >
            {address ? "Connected" : "Connect"}
          </button>
        </div>
      </header>
      <CreatePostModal
        invisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Header;
