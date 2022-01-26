function Ready(props) {
    return (
      <div className="pl-32 pr-32 pt-8">
        <div className="flex justify-center space-x-8">
          
  
          <div className="bg-slate-500 w-fit p-4 rounded-md">
            <h1 className="text-white text-xl font-extrabold ">
              Pin Your Tweet.
            </h1>
  
            <p className="text-white text-lg">
              Put in a tweet link above, and we&apos;ll create a screenshot, then upload it to IPFS. This will make a 
              decentralized copy of the tweet available to anyone who has the IPFS hash, and as long as one person has it pinned, it will be available <b>forever</b>.
            </p>
  
         
          </div>
        </div>
      </div>
    );
  }
  
  export default Ready;
  