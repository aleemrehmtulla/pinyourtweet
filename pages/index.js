import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import * as IPFS from "ipfs-core";
import { useState } from "react";
import Link from "next/link";
import Gallery from "./gallery";
import Uploaded from "./uploaded";
import Loading from "./loading";
import Ready from "./ready";
import Swal from "sweetalert2";

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

    if (result.user == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Username not found',
        text: "We couldn't find the username in the tweet url, please ensure it's a tweet link!",
       
      })
    }
    if (result.id == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'ID not found',
        text: "We couldn't find the ID in the tweet url, please ensure it's a tweet link!",
       
      })
    }


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
      console.log("done!")
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

  const Search = `https://ipfs.io/ipfs/${cid}`;


  if (status==="loading") {
    return (
      <div >
        <Loading doing={doing} />
      </div>
    )
  }


    function Hi(){
      const SkeletonKeys = [
        "79568777",
      ]
      let theReturn=[]
      
    if (status!=="uploaded" ) {  
      const IdentifierKeys = SkeletonKeys
      theReturn = IdentifierKeys.map(index => {
      return (
        <span key={index}>
          <Ready />
        </span>
      )
      })
      }
     
    if (status=="uploaded")  {  
      const IdentifierKeys = SkeletonKeys
      theReturn = IdentifierKeys.map(index => {
       return (
          <span key={index}>
            <Uploaded cid={cid} search={Search} />
          </span>
        )
        })
      }

return theReturn

       }
      

  return (
    <div className="bg-slate-100 h-full w-full pb-96 ">
    <div className="flex justify-center">
      <div className=" flex  place-content-center pl-8 pr-8 lg:pr-36 lg:pl-36 w-full  pt-8">

      <form onSubmit={send} className="flex w-full ">
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

    <div className="pl-8 pr-8 lg:pr-36 lg:pl-36 pt-8">

    <Hi />
   
        
        </div>

    <div className="pr-8 pl-8 lg:pr-36 lg:pl-36 pt-16">

   <Gallery />
   </div>
  
  </div>

  
  );
   



  }