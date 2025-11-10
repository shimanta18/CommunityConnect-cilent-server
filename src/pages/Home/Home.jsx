import { useLoaderData } from "react-router";
import Banner from "../../Components/banner/banner";
import FeatureCards from "../../Components/FeatureCards/FeatureCards";
import Gallery from "../../Components/Gallery/Gallery";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  
  return (
    <div>
      <Banner></Banner>
      <Gallery></Gallery>
      <FeatureCards data={data}></FeatureCards>
    </div>
  )
}
export default Home