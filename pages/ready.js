function Ready(props) {
    return (
      <div className=" pt-8">
        <div className="flex justify-center w-full ">
          
  
          <div className="bg-slate-500 w-full p-4 rounded-md">
            <h1 className="text-white text-xl font-extrabold ">
              Pin Your Tweet.
            </h1>
  
            <p className="text-white text-lg">
              Put in a tweet link above, and we&apos;ll create a screenshot, then upload it to IPFS. This will make a 
              decentralized copy of the tweet available to anyone who has the IPFS hash, and as long as one person has it pinned, it will be available <b>forever</b>.
            </p>

            <p className="text-white justify-center text-lg font-bold pt-8 flex ">
                Ensure you put in a valid tweet link.
            </p>
         
          </div>
        </div>
      </div>
    );
  }
  
  export default Ready;
  