function Loading(props){
    return (
        <div className="w-screen h-screen opacity-75 delay-150 duration-200	top-0 bg-slate-600">
        <div className="flex pt-48 justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
        <h1 className="flex pt-8 text-white justify-center">
          Allow us a couple seconds to upload your tweet as an image on IPFS :)
        </h1>
  
        <p className="flex pt-8 text-white justify-center">
          Currently: {props.doing}
        </p>

        <p className="flex pt-8 text-white justify-center">*this will take a bit- moved api to free level 🙈 (02/13/2022)</p>
     
      </div>
    )
}

export default Loading;