const FeaturesSection = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-surface">
      <div className=" py-8 mt-10 flex flex-col items-center justify-center gap-2 md:px-24 px-4 max-w-[1280px]">
        <div className="font-bold md:text-3xl text-2xl">Key Features</div>
        <div className="md:max-w-lg w-full text-center font-medium">
          Effortlessly create profile, build resume with multiple templates,
          apply for multiple jobs and prepare for an interview with CareerEase.
        </div>

        <div className="flex flex-col md:gap-4 gap-8 mt-10 md:mt-4">
          {/* 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left section */}
            <div className="flex flex-col gap-4 md:w-1/2 w-full md:items-end items-center">
              <div className="font-semibold md:text-2xl text-xl">
                User Profile Setup
              </div>
              <div className="md:text-lg md:text-end text-center text-textSecondary">
                The User Profile Setup in CareerEase is designed to provide a
                seamless and user-friendly experience for job seekers right from
                the start. Profile Setup
              </div>
            </div>
            {/* Right Section */}
            <div className="flex items-center md:justify-end justify-center w-1/2">
              <img
                src="assets/home_features_profile_setup.svg"
                alt=""
                className="md:w-[400px] md:h-[300px] h-[250px]"
              />
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 gap-8">
            {/* Left section */}
            <div className="flex items-center md:justify-start justify-center md:w-1/2 w-full md:order-1 order-2">
              <img
                src="assets/home_features_resume_template.svg"
                alt=""
                className="w-[400px] h-[250px] md:h-[300px]"
              />
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-4 md:w-1/2 w-full md:items-start items-center md:order-2 order-1">
              <div className="font-semibold md:text-2xl text-xl ">
                Resume Template
              </div>
              <div className="md:text-lg md:text-start text-center text-textSecondary ">
                The uploaded resumes are stored securely and can be accessed and
                edited anytime, ensuring users are always prepared for new job
                applications
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left section */}
            <div className="flex flex-col gap-4 md:w-1/2 md:items-end items-center">
              <div className="font-semibold md:text-2xl text-xl">
                Interview Preparation
              </div>
              <div className="md:text-lg text-center md:text-end text-textSecondary">
                Equip users with essential interview preparation resources,
                including common questions and mock interview scenarios. This
                feature ensures users are well-prepared and confident for their
                interviews.
              </div>
            </div>
            {/* Right Section */}
            <div className="flex items-center justify-center md:justify-end w-1/2">
              <img
                src="assets/home_features_interview_prep.svg"
                alt=""
                className="w-[400px] h-[250px]"
              />
            </div>
          </div>
          {/* 4 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left section */}
            <div className="flex items-center justify-center md:justify-start md:w-1/2 w-full md:order-1 order-2">
              <img
                src="assets/home_features_job_application.svg"
                alt=""
                className="w-[400px] md:h-[300px] h-[250px]"
              />
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 items-center md:items-start md:order-2 order-1">
              <div className="font-semibold md:text-2xl text-xl">
                Automate Job Applications
              </div>
              <div className="md:text-lg text-center md:text-start text-textSecondary">
                Enhance efficiency by automating job applications across various
                platforms. Users can leverage stored personal information and
                preferences to apply to multiple job listings with a single
                click. Apply
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
