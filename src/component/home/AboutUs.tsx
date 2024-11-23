import { VscDebugBreakpointLog } from "react-icons/vsc";

const AboutUs = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-8 px-8">
      <div className="font-bold text-3xl">About Us</div>
      <div className="flex items-center justify-between gap-8">
        {/* Left Section */}
        <div className="flex flex-col w-1/2">
          <div className="text-lg font-medium text-textSecondary">
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
        <div className="flex items-center justify-center w-1/2">
          <img src="assets/home_about_us.svg" alt="" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
