import { VscDebugBreakpointLog } from "react-icons/vsc";

const About = () => {
  return (
    <div className="flex items-center justify-center w-full h-full mt-16 md:mt-20">
      <div className="mt-12 flex flex-col items-center justify-center gap-8 md:px-8 px-4 max-w-[1280px] pb-10">
        <div className="font-bold text-2xl md:text-3xl">About Us</div>
        <div className="flex md:flex-row flex-col items-center justify-between md:gap-8 gap-10">
          {/* Left Section */}
          <div className="flex flex-col md:w-1/2 w-full">
            <div className="md:text-lg font-medium text-textSecondary">
              Welcome to{" "}
              <span className="font-bold text-textPrimary">CareerEase</span>,
              where we revolutionize the way you navigate your career journey.
              Founded on the belief that job searching should be empowering and
              efficient,
              <span className="font-bold text-textPrimary">CareerEase</span> is
              dedicated to providing smart tools and personalized solutions to
              help job seekers achieve their professional aspirations with ease.
            </div>
            <div className="flex flex-col gap-1 mt-6 font-medium">
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog />
                <span>Customized Resume and Cover Letter Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog />
                <span>Job Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog />
                <span>Interview Preparation Tools</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full md:w-1/2">
            <img
              src="assets/home_about_us.svg"
              alt=""
              className="md:w-[80%] w-[60%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
