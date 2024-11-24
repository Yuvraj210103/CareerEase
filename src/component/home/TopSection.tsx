const TopSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:px-8 px-4 md:pt-8 pt-0 gap-8 md:gap-0">
      <div className="flex flex-col w-full md:w-1/2 gap-2">
        <div className="font-bold text-4xl md:text-5xl">
          Navigate Your <span className="text-textPrimaryBlue">Career</span>{" "}
          with <br /> <span className="text-textPrimaryBlue">Ease</span>
        </div>
        <div className="md:text-2xl text-xl text-textTertiary font-medium leading-6">
          CareerEase is your dedicated companion in the journey towards your
          dream career.
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-end">
        <img src="assets/home_top_section.svg" alt="" className="size-[90%]" />
      </div>
    </div>
  );
};

export default TopSection;
