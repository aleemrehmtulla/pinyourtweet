import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import * as IPFS from "ipfs-core";
import { useState } from "react";

export default function Home() {
  // init for base64
  const atob = (str) => Buffer.from(str, "base64").toString("binary");
  const [cid, setCid] = useState("QmaaQcrim3WihA5BGYGeJS3QSVbM4yp1AuGzMy3H5aPecS");

  async function ImageToBase() {
    const getBase64FromUrl = async (url) => {
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
    const Base64 = await getBase64FromUrl(
      "https://www.aleemrehmtulla.com/img/aleem/logos.jpeg"
      
    );
    async function UploadToIpfs() {
      const Blob = await DataURIToBlob(Base64);
      const ipfs = await IPFS.create();
      const { cid } = await ipfs.add(Blob);
      console.log(cid.toString());
      setCid(cid.toString());
      return cid;
    }
    UploadToIpfs();
  }
  useEffect(() => {
    ImageToBase();
  }, []);

  // takes base64 string and returns a blob
  function DataURIToBlob(dataURI) {
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
    return Buffer.from(ia);
  }

  const Search =  `https://gateway.pinata.cloud/ipfs/${cid}`;

  return (
    <div className="bg-slate-100 h-screen ">
    <div className="flex justify-center">
      <div className="w-3/6 flex  place-content-center  pt-8">
        <input
          type="search"
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
      </div>
    </div>

    <div className="w-full pt-20 ">
      <Image
        alt=""
        src={Search}
        width="500%"
        height="500%"
        objectFit="contain"
        className="w-full h-full"
      />
    </div>
    <div className="grid  pt-48 grid-cols-3 space-x-2">
     
    </div>
  </div>
  );
}
