import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";

import TestimonyCard from "./TestimonyCard";
import { useEffect, useState, useContext } from "react";
import { InfoContext } from "@/pages/_app";
const Testimonies = ({ postid }) => {
  //Web3 Part
  const { state, account } = useContext(InfoContext);
  const { provider, signer, contract } = state;
  const [mytestimonies, setMyTestitmies] = useState([]);
  useEffect(() => {
    const getTestimonies = async () => {
      const testimonies =
        (await contract) && (await contract.getAllTestimonies());
      setMyTestitmies(testimonies);
      console.log(testimonies[0]);
    };
    getTestimonies();
  }, []);
  return (
    <div className="bg-white/3  px-5 py-5 space-x-5 flex overflow-x-auto scrollbar rounded-lg">
      {mytestimonies &&
        mytestimonies.map((testimony) => {
          return (
            <TestimonyCard
              key={testimony[0].toString()}
              id={testimony[0].toString()}
              address={testimony[1]}
              title={testimony[2]}
              desc={testimony[3]}
              date={testimony[4]}
              image={testimony[5]}
              location={testimony[6]}
            />
          );
        })}
    </div>
  );
};

export default Testimonies;
