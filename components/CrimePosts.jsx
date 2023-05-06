import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState, createContext, useContext } from "react";
import { InfoContext } from "@/pages/_app";
import { toast } from "react-hot-toast";

const CrimePosts = () => {
  const crimetypes = [
    "Assault",
    "Bribery",
    "Extortion",
    "Fraud",
    "Hijaking",
    "Kidnaping",
    "Prostitution",
    "Rape",
    "Robbery",
    "Terrorism",
    "Theft",
  ];

  const postss = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const [firstTime, setFirstTime] = useState(true);
  const [keepSelected, setKeepSelected] = useState(0);
  const [showCrimeModal, setShowCrimeModal] = useState(false);

  //Web3 Part
  const { state, account } = useContext(InfoContext);
  const { provider, signer, contract } = state;
  const [allposts, setAllposts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const posts = (await contract) && (await contract.getAllPosts());
      setAllposts(posts);
      // console.log("Hello");
      // console.log(posts[0][0]);
      (await posts) && console.log(posts);
    };
    getPosts();
  }, [contract, allposts]);

  useEffect(() => {
    const hacker = (id, i) => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let iterations = 0;
      const eleName = document.getElementById(id);
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
      }, 30 + i * 2);
    };

    for (var i = 0; i < crimetypes.length; i++) {
      hacker(crimetypes[i], i);
    }
  }, []);

  return (
    <>
      <div className=" rounded-lg backdrop-blur-sm bg-white/3 col-span-9  py-5 h-full">
        {/* // Crime type Selection */}
        <div className="flex items-center  overflow-x-auto px-5 scrollbar-none space-x-4 ">
          {crimetypes.map((crime, i) => {
            return (
              <button
                className={`crimes flex ${
                  firstTime && i === 0 && `text-yellow-green bg-white/10`
                } ${i === keepSelected && `text-yellow-green bg-white/10`}`}
                key={crime}
                onClick={() => {
                  setFirstTime(false);
                  setKeepSelected(i);
                }}
                data-value={crime}
                id={crime}
              >
                {crime}
              </button>
            );
          })}
        </div>

        {/* Crime Posts */}
        <div className="grid grid-cols-2 px-5 pt-3 mt-3 h-[550px] overflow-y-auto scrollbar rounded-lg">
          {allposts &&
            allposts.map((post) => {
              return (
                <Link
                  href={`/crimepost/${post[0].toString()}`}
                  key={post[0].toString()}
                >
                  <div className="flex flex-nowrap space-x-3">
                    <div
                      className={`post-card h-[200px] w-full  ${
                        post[0].toString() % 2 != 1 && `ml-5`
                      }`}
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center">
                          <div className="tag">{post[2]}</div>
                          <CubeTransparentIcon className="h-6 text-gray-400 w-6 ml-auto" />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-lg ">
                            {`${post[1].substring(0, 55)}...`}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {`${post[3].substring(0, 210)}...`}
                            {/* 268 Characters */}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center space-x-1 group">
                          <MapPinIcon className="h-5 w-5 text-gray-500 group-hover:text-white/80" />
                          <p className="text-xs text-gray-500 group-hover:text-white/80">
                            {post[6]}
                          </p>
                        </div>
                        <div className="flex ml-auto items-center space-x-1 pr-2 group">
                          <CalendarDaysIcon className="h-5 w-5 text-gray-500 group-hover:text-white/80" />
                          <p className="text-xs text-gray-500 group-hover:text-white/80">
                            {post[4]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

          {/* <div className="border border-white ml-2 mt-3">Second</div> */}
        </div>
      </div>
    </>
  );
};

export default CrimePosts;
