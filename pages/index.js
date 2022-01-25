import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import * as IPFS from "ipfs-core";

export default function Home() {
  // init for base64
  const atob = (str) => Buffer.from(str, "base64").toString("binary");

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
      "https://www.aleemrehmtulla.com/img/aleem/portugal.png"
    );
    async function UploadToIpfs() {
      const Blob = await DataURIToBlob(Base64);
      const ipfs = await IPFS.create();
      const { cid } = await ipfs.add(Blob);
      console.log(cid.toString());
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

  return (
    <div className="bg-red-500">
      <h1 className="text-3xl font-bold underline">Tailwind Boom</h1>
    </div>
  );
}
