function Uploaded(props) {
  return (
    <div className="">
      <div className=" xl:flex  justify-center w-full ">
       
        <div className=" h-full pr-8 pb-4 md:pb-4 ">
        <div className="w-full rounded-full hover:cursor-pointer">
          <a
            href={`https://ipfs.io/ipfs/${props.cid}`}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <img src={props.search} alt="" className="w-full"/>
          </a>
        </div>
        </div>

        <div className="bg-slate-500 w-fit h-full shrink p-4 rounded-md">
          <h1 className="text-white text-xl font-bold ">
            Congrats! Your image is now available on IPFS!
          </h1>

          <p className="text-slate-300 text-lg">
            This screenshot will now live as long as one node has it pinned, it
            is available and decentralized using IPFS.
          </p>

          <p className="text-slate-300 text-lg font-bold pt-8 flex ">
            Click to view it on  &#160;
            <a
              href={`https://ipfs.io/ipfs/${props.cid}`}
              target="_blank"
              rel="noreferrer"
              className="hover:cursor-pointer text-blue-200 underline"
            >
              
              Pinata.
            </a>
          </p>
          <p className="text-slate-300">
            Your CID (ipfs hash) is: 
            <p className="text-blue-200 text-sm  break-all w-fit">{props.cid}</p>
          </p>
        </div>


      </div>
    </div>
  );
}

export default Uploaded;
