import AboutUs from "../../component/home/AboutUs";
import FeaturesSection from "../../component/home/FeaturesSection";
import OurCommunity from "../../component/home/OurCommunity";
import TopSection from "../../component/home/TopSection";

const Home = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-full h-full py-10 max-w-[1280px]">
        <TopSection />
        <FeaturesSection />
        <AboutUs />
        <OurCommunity />
      </div>
    </div>
  );
};

export default Home;
