import { useState, useEffect } from "react";
import Link from "next/link";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";


function Tweet(props){
   
    const cid = "QmQBNavv5J4fEMnDbkk6Ytej9mpgGNLDumVA1hQSVgNkFj"
    const Search = `https://gateway.pinata.cloud/ipfs/${props.cid}`
    return (
        <div className="w-full">
        <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noreferrer">
        <div className="w-full h-full rounded-full hover:cursor-pointer">
          
            <img src={Search} alt="" width={500} height={500} />
            </div>
        </a>
        </div>
    )

}

function Index(props){

    
    const testKeys = [
        "QmeZPQjbrCAqFEKR7pCqTKahYNvZuuHZLDskgVAPSU9DRp",
        "QmQjcy5bovazF1hHMsEUDqn5VcwxT3JHcLCR1jDRrwJmwA",
        "QmYPnySXUaRXVjj4t7ukABGYr48oN1GdBwQxb2G8hihM94",
   
      ]
      let cards = []
      if (1==1) {
        const PadawanKeys = testKeys
        cards = PadawanKeys.map(index => {
      
        return (
          
        <span key={index}>
         
            <Tweet cid={index}/>
         
        </span>
        )
        })
       
      }
   
    return cards
}

function Gallery(){
    return (

        <div className="grid grid-cols-3 space-x-5 gap-4 ">
        <Index />
        </div>
    )
}

export default Gallery


  // <div className="flex justify-center ">
   
  //       <div className="w-full  rounded-full   ">
  //       <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} className="cursor-default " target="_blank" rel="noreferrer">
  //           <img src={Search} alt="" width={500} height={500} />
  //           </a>
  //           </div>

  //           <div className="bg-slate-500 w-3/6 p-4 rounded-md">

  //             <h1 className="text-white text-xl font-bold">
  //               Congrats! Your image is now available on IPFS!
  //             </h1>

  //             <p className="text-white text-lg">
  //               This screenshot will now live as long as one node has it pinned, it is available and decentralized using IPFS.
  //             </p>


  //             <p className="text-white text-lg font-bold pt-8 flex">
  //               Click on the image to view it on  &nbsp;<a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noreferrer" className="hover:cursor-pointer text-blue-200 underline"> Pinata.</a>
  //             </p>
  //             <p className="text-white">
  //               Your CID (ipfs hash) is: <p className="text-blue-200">{cid}</p>
  //             </p>


  //           </div>



  //           </div>