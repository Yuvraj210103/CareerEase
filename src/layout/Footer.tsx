import { ConstContactDetails } from "../component/constants/ConstContactDetails";

const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center text-surface">
      <div
        className={`flex w-full  flex-col items-center bg-footerBg px-4 lg:px-36`}
      >
        <div className="flex w-full max-w-[1280px] flex-col py-8 ">
          <div className="flex w-full flex-col items-center justify-between lg:flex-row">
            <div className="flex w-full flex-col items-center justify-center lg:items-start">
              <div className="flex items-center">
                <img src="/logo.png" alt="" className="h-[60px] w-[75px]" />
                <div className="flex flex-col">
                  <div className="font-bold text-3xl">CareerEase</div>
                  <div className="text-sm">Navigate Your Career with Ease</div>
                </div>
              </div>

              <h3 className="text-sm mt-2 ml-3">
                <a href={`mailto:${ConstContactDetails.EMAIL}`}>
                  {ConstContactDetails.EMAIL}
                </a>
              </h3>
              <h3 className="text-sm ml-3">
                <a href={`tel:${ConstContactDetails.PHONE_NUMBER}`}>
                  {`${ConstContactDetails.PHONE_NUMBER.slice(
                    0,
                    3
                  )} ${ConstContactDetails.PHONE_NUMBER.slice(3)}`}
                </a>
              </h3>
            </div>
            <div className=" grid  w-full grid-cols-2 text-center  text-sm lg:text-end lg:text-base">
              <div className="md:text-lg">
                <div className="my-5 ">Home</div>

                <div className="my-5 ">About Us</div>

                <div className="my-5 ">Contact Us</div>
              </div>
              <div className="md:text-lg">
                <div className="my-5 ">Privacy Policy</div>
                <div className="my-5 ">Terms & Conditions</div>
                <div className="my-5 ">Help & FAQ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full  flex-col items-center bg-secondary px-4 lg:px-36">
        <div className="flex w-full max-w-[1280px] flex-col py-4">
          <h2 className="text-center text-xs">
            &copy;{new Date().getFullYear()} CareerEase. All rights reserved.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
