const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center ">
      <div className="flex w-full  flex-col items-center bg-gray-200 px-4 lg:px-36 pt-10 gap-6">
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col ">
            <div className="flex items-center">
              <img src="/logo.png" alt="" className="h-[60px] w-[75px]" />
              <div className="flex flex-col">
                <div className="font-bold text-3xl">CareerEase</div>
                <div className=" text-textSecondary text-sm">
                  Navigate Your Career with Ease
                </div>
              </div>
            </div>

            <div className="ml-3 text-textSecondary text-sm mt-2">
              yuvrajssingh03@gmail.com
            </div>
            <div className="ml-3 text-textSecondary text-sm">
              +91 8624016814
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <span className="font-bold">Quick Access</span>
            <span className="mt-2 font-medium">Home</span>
            <span className="font-medium">About Us</span>
            <span className="font-medium">Contact</span>
          </div>
          <div className="flex flex-col justify-between">
            <span className="font-bold">Legal</span>
            <span className="mt-2 font-medium">Privacy Policy</span>
            <span className="font-medium">Terms and Condition</span>
            <span className="font-medium">&nbsp;</span>
          </div>
        </div>

        <div className="flex w-full max-w-[1280px] flex-col py-4">
          <h2 className="text-center text-sm">
            Copyright &copy;{new Date().getFullYear()} CareerEase | All rights
            reserved.
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
