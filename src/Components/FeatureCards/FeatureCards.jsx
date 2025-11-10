import { Suspense } from "react";
import Feature from "../Feature/Feature";

const FeatureCards = ({data}) => {
  return (
    <div className='bg-white text-center'>
      <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight'>Our Community in Action</h1>
      <p className='mt-4 max-w-2xl mx-auto text-lg text-gray-600'>Moments from the events that bring us together.</p>
    <Suspense fallback={<span>loading</span>}>
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            data.map((singleCard)=>(<Feature key={singleCard.id} singleCard={singleCard}></Feature>)
        )}
    </div>
    </Suspense>
    
    </div>
  )
}

export default FeatureCards
