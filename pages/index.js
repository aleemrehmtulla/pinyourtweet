import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import * as IPFS from "ipfs-core";
import { useState } from "react";
import Link from "next/link";
import Gallery from "./gallery";

export default function Home() {
  // init for base64
  const atob = (str) => Buffer.from(str, "base64").toString("binary");
  const [cid, setCid] = useState("QmQBNavv5J4fEMnDbkk6Ytej9mpgGNLDumVA1hQSVgNkFj");
  const [status , setStatus] = useState("ready");
  const [doing, setDoing] = useState("....");


  const send = async event => {
    event.preventDefault()
    setStatus("loading")
    setDoing("grabbing username and id...")
    const res = await fetch('/api/hello', {
      body: JSON.stringify({
        name: event.target.name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    ImageToBase(result)
  }


  async function ImageToBase(result) {

    console.log("Username is: " + result.user)
    console.log("ID is: " + result.id)

    const getBase64FromUrl = async (url) => {
      setDoing("putting image in Base64...")
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    };

    // change to localhost in dev
    const Base64 = await getBase64FromUrl(`https://pinyourtweet.vercel.app/_next/image?url=https%3A%2F%2Ftweets-as-an-image.herokuapp.com%2Ftweet%3FtwitterHandle%3D${result.user}%26id%3D${result.id}%26theme%3Dlight&w=1080&q=75`);
    
    async function UploadToIpfs() {
      const Blob = await DataURIToBlob(Base64);
      const ipfs = await IPFS.create( {repo: 'ok' + Math.random()});
      setDoing("uploading to ipfs...")
      const { cid } = await ipfs.add(Blob);
      console.log(cid.toString());
      setCid(cid.toString());
      setDoing("done!")
      setStatus("uploaded");
      return cid;
    }
    UploadToIpfs();
  }


  // takes base64 string and returns a blob
  function DataURIToBlob(dataURI) {
    setDoing("taking Base64 to Blob...")
    console.log("Taking Base64 Image and converting to Blob...");
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    console.log("Base64 Image converted to Blob");
    setDoing("generating Ed25519 keypair...    ")
    return Buffer.from(ia);
  }

  const Search = `https://gateway.pinata.cloud/ipfs/${cid}`;


  if (status==="loading") {
    return (
      <div className="w-screen h-screen opacity-75 delay-150 duration-200	top-0 bg-slate-600">
      <div className="flex pt-48 justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
      <h1 className="flex pt-8 text-white justify-center">
        Allow us a couple seconds to upload your tweet as an image on IPFS :)
      </h1>

      <p className="flex pt-8 text-white justify-center">
        Currently: {doing}
      </p>
    </div>
    )
  }



  return (
    <div className="bg-slate-100 h-screen ">
    <div className="flex justify-center">
      <div className="w-5/6 flex  place-content-center  pt-8">

      <form onSubmit={send} className="flex w-3/6 ">
        <input
          type="text"
          id="name" 
          name="name"
          className="w-full px-4 py-1 text-gray-800 rounded-l-lg focus:outline-none"
          placeholder="https://twitter.com/aleemrehmtulla/status/1484616584564031494"
          x-model="search"
        />

        <button
          type="submit"
          className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>


       



        </form>

      

      </div>
      
    </div>

    <div className="pl-32 pr-32 pt-8">

      <div className="flex justify-center space-x-8">
   
        <div className="w-2/6  rounded-full hover:cursor-pointer">
        <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noreferrer">
            <img src={Search} alt="" width={500} height={500} />
            </a>
            </div>

            <div className="bg-slate-500 w-3/6 p-4 rounded-md">

              <h1 className="text-white text-xl font-bold">
                Congrats! Your image is now available on IPFS!
              </h1>

              <p className="text-white text-lg">
                This screenshot will now live as long as one node has it pinned, it is available and decentralized using IPFS.
              </p>


              <p className="text-white text-lg font-bold pt-8 flex">
                Click on the image to view it on  &nbsp;<a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noreferrer" className="hover:cursor-pointer text-blue-200 underline"> Pinata.</a>
              </p>
              <p className="text-white">
                Your CID (ipfs hash) is: <p className="text-blue-200">{cid}</p>
              </p>


            </div>



            </div>
        
        </div>

    <div className="pr-20 pl-20 pt-16">

   <Gallery />
   </div>
  
  </div>

  
  );
}
