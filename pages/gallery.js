import { useState, useEffect } from "react";
import Link from "next/link";


function Tweet(){
   
    const cid = "QmQBNavv5J4fEMnDbkk6Ytej9mpgGNLDumVA1hQSVgNkFj"
    const Search = `https://gateway.pinata.cloud/ipfs/${cid}`
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

function Index(){

    
    const testKeys = [
        "79568777",
        "363714261",
        "595967632",
        "662929773",
        "925201439",
        "925203539",
        "927204439",
        "925505439",
        "925706439",
      ]
      let cards = []
      if (1==1) {
        const PadawanKeys = testKeys
        cards = PadawanKeys.map(index => {
      
        return (
          
        <span key={index}>
         
            <Tweet />
         
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