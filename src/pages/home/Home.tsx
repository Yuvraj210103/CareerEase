import FeaturesSection from "../../component/home/FeaturesSection";
import OurCommunity from "../../component/home/OurCommunity";
import TopSection from "../../component/home/TopSection";

const Home = () => {
  return (
    <div id="home" className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-full h-full pt-10 mt-16">
        <TopSection />
        <FeaturesSection />
        <OurCommunity />
      </div>
    </div>
  );
};

export default Home;
