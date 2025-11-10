
const Feature = ({singleCard}) => {
  const{id,pictureURL,alt,title,description,}= singleCard
  return (
    <div className="card  bg-white ">
      <div className="p-3 px-5 py-3">
        <img
        src={pictureURL}
        alt="card"
        className="h-72 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"></img>
      </div>
      <div className="card-body bg-white ">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <p className="mt-1 text-sm text-black">{description}</p>
      </div>
    </div>
  )
}

export default Feature
