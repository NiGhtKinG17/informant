import "@/styles/globals.css";
import { ethers } from "ethers";
import { useEffect, useState, createContext, useContext } from "react";

const walletAddress = "0x7ae196c8e986af4af890849e27cfbb9671423d33";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "crimeType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "images",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "location",
        type: "string",
      },
    ],
    name: "AddPost",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "images",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "AddTestimony",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "testimonyTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "testimonyDesc",
        type: "string",
      },
      {
        internalType: "string",
        name: "testimonyTimeStamp",
        type: "string",
      },
      {
        internalType: "string",
        name: "testimonyLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "addTestimony",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_crimeType",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_timeStamp",
        type: "string",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
    ],
    name: "addPost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "getMyTestimonies",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "string",
            name: "testimonyTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyDesc",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyTimeStamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "postid",
            type: "uint256",
          },
        ],
        internalType: "struct InformantV1.Testimony[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getTestimoniesByPostId",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "string",
            name: "testimonyTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyDesc",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyTimeStamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "postid",
            type: "uint256",
          },
        ],
        internalType: "struct InformantV1.Testimony[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getPostByTestimonyId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getUserByTestimonyId",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getAllPosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "postid",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "crimeType",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "timeStamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
        ],
        internalType: "struct InformantV1.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getAllTestimonies",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "string",
            name: "testimonyTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyDesc",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyTimeStamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "postid",
            type: "uint256",
          },
        ],
        internalType: "struct InformantV1.Testimony[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getPostByPostid",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "postid",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "crimeType",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "timeStamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
        ],
        internalType: "struct InformantV1.Post",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getTestimonyByTestimonyid",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "string",
            name: "testimonyTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyDesc",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyTimeStamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "testimonyLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "postid",
            type: "uint256",
          },
        ],
        internalType: "struct InformantV1.Testimony",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
    ],
    name: "reward",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getPostTitleByPostid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getCrimeTypeByPostid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getPostDescByPostid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getPostTimeStampByPostid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postid",
        type: "uint256",
      },
    ],
    name: "getPostLocationByPostid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getPostCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getTestimonyCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getTestimonyTitleByTestimonyid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getTestimonyDescByTestimonyid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getTestimonyTimeStampByTestimonyid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "testimonyId",
        type: "uint256",
      },
    ],
    name: "getTestimonyLocationByTestimonyid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const InfoContext = createContext();

export default function App({ Component, pageProps }) {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(walletAddress, abi, signer);
        setState({ provider, signer, contract });
      } catch (err) {
        console.log(err);
      }
    };

    template();
  }, []);

  return (
    <InfoContext.Provider value={{ state, account }}>
      <Component {...pageProps} />
    </InfoContext.Provider>
  );
}
