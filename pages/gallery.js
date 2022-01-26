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

        <div className="grid grid-cols-1 place-items-center lg:grid-cols-3 space-x-5 gap-4 ">
        <Index />
        </div>
    )
}

export default Gallery


