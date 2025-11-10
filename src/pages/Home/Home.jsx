import { useLoaderData } from "react-router";
import FeatureCards from "../../Components/FeatureCards/FeatureCards";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  
  return (
    <div>
      <FeatureCards data={data}></FeatureCards>
    </div>
  )
}

export default Home
