function Uploaded(props) {
  return (
    <div className="pl-32 pr-32 pt-8">
      <div className="flex justify-center space-x-8">
        <div className="w-full h-full  rounded-full hover:cursor-pointer">
          <a
            href={`https://gateway.pinata.cloud/ipfs/${props.cid}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={props.search} alt="" width={500} height={500} />
          </a>
        </div>

        <div className="bg-slate-500 w-fit p-4 rounded-md">
          <h1 className="text-white text-xl font-bold ">
            Congrats! Your image is now available on IPFS!
          </h1>

          <p className="text-slate-300 text-lg">
            This screenshot will now live as long as one node has it pinned, it
            is available and decentralized using IPFS.
          </p>

          <p className="text-slate-300 text-lg font-bold pt-8 flex">
            Click on the image to view it on &nbsp;
            <a
              href={`https://gateway.pinata.cloud/ipfs/${props.cid}`}
              target="_blank"
              rel="noreferrer"
              className="hover:cursor-pointer text-blue-200 underline"
            >
              {" "}
              Pinata.
            </a>
          </p>
          <p className="text-slate-300">
            Your CID (ipfs hash) is:{" "}
            <p className="text-blue-200">{props.cid}</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Uploaded;
