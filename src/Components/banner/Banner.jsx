
const Banner = () => {
 const imageUrl = "https://i.postimg.cc/vHmfkX7S/asset-cf5dead4.jpg"

 return(
    <div className="w-full py-16 md:py-24 bg-red-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center leading-tight">
          Connect, Create, and Contribute: Your Community Awaits!
        </h1>
        {/*buttons*/ }
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <button className="cursor-pointer w-full sm:w-auto px-8 py-3 rounded-full text-base font-semibold text-gray-900 bg-white shadow-md transition-transform duration-200 ease-in-out hover:">Login Now
            </button>
            <button className="cursor-pointer w-full sm:w-auto px-8 py-3 rounded-full text-base font-semibold text-gray-900 text-white bg-transparent border-2 border-white shadow-md transition-all duration-200 ease-in-out  hover:bg-green-500">Join Now
            </button>
        </div>
{/*Image*/ }
        <div className="mt-16 ">
            <img 
            src={imageUrl} className=" h-auto object-cover mx-auto ">
            </img>
        </div>
        </div>
    </div>
 )
}

export default Banner