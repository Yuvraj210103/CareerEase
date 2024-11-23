const FeaturesSection = () => {
  return (
    <div className="bg-surface py-8 mt-10 flex flex-col items-center justify-center gap-2 px-24">
      <div className="font-bold text-3xl">Key Features</div>
      <div className="max-w-lg text-center font-medium">
        Effortlessly create profile, build resume with multiple templates, apply
        for multiple jobs and prepare for an interview with CareerEase.
      </div>

      <div className="flex flex-col gap-4">
        {/* 1 */}
        <div className="flex items-center justify-between gap-8">
          {/* Left section */}
          <div className="flex flex-col gap-4 w-1/2 items-end">
            <div className="font-semibold text-2xl">User Profile Setup</div>
            <div className="text-lg text-end">
              The User Profile Setup in CareerEase is designed to provide a
              seamless and user-friendly experience for job seekers right from
              the start. Profile Setup
            </div>
          </div>
          {/* Right Section */}
          <div className="flex items-center justify-end w-1/2">
            <img
              src="assets/home_features_profile_setup.svg"
              alt=""
              className="size-[400px]"
            />
          </div>
        </div>
        {/* 2 */}
        <div className="flex items-center justify-between gap-8">
          {/* Left section */}
          <div className="flex items-center justify-start w-1/2">
            <img
              src="assets/home_features_job_application.svg"
              alt=""
              className="w-[400px] h-[300px]"
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4 w-1/2 items-start">
            <div className="font-semibold text-2xl">
              Automate Job Applications
            </div>
            <div className="text-lg text-start">
              Enhance efficiency by automating job applications across various
              platforms. Users can leverage stored personal information and
              preferences to apply to multiple job listings with a single click.
              Apply
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="flex items-center justify-between gap-8">
          {/* Left section */}
          <div className="flex flex-col gap-4 w-1/2 items-end">
            <div className="font-semibold text-2xl">Resume Template</div>
            <div className="text-lg text-end">
              The uploaded resumes are stored securely and can be accessed and
              edited anytime, ensuring users are always prepared for new job
              applications
            </div>
          </div>
          {/* Right Section */}
          <div className="flex items-center justify-end w-1/2">
            <img
              src="assets/home_features_resume_template.svg"
              alt=""
              className="w-[400px] h-[300px]"
            />
          </div>
        </div>
        {/* 4 */}
        <div className="flex items-center justify-between gap-8">
          {/* Left section */}
          <div className="flex items-center justify-start w-1/2">
            <img
              src="assets/home_features_interview_prep.svg"
              alt=""
              className="w-[400px] h-[300px]"
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4 w-1/2 items-start">
            <div className="font-semibold text-2xl">Interview Preparation</div>
            <div className="text-lg text-start">
              Equip users with essential interview preparation resources,
              including common questions and mock interview scenarios. This
              feature ensures users are well-prepared and confident for their
              interviews.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
