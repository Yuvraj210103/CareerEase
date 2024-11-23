const TopSection = () => {
  return (
    <div className="flex items-center justify-between px-8 pt-8">
      <div className="flex flex-col w-1/2 gap-2">
        <div className="font-bold text-5xl">
          Navigate Your <span className="text-textPrimaryBlue">Career</span>{" "}
          with <br /> <span className="text-textPrimaryBlue">Ease</span>
        </div>
        <div className="text-2xl text-textTertiary font-medium leading-6">
          CareerEase is your dedicated companion in the journey towards your
          dream career.
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-end">
        <img src="assets/home_top_section.svg" alt="" className="size-[90%]" />
      </div>
    </div>
  );
};

export default TopSection;
