import Button from "../component/common/button/Button";

const Nav = () => {
  return (
    <div className="flex items-center w-full bg-surface shadow-md px-6 py-4 justify-between">
      <div className="flex items-center gap-1">
        <img src="assets/logo.png" alt="" className="size-10" />
        <div className="font-bold text-lg">CareerEase</div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-8">
          <div className="text-lg font-semibold cursor-pointer">Home</div>
          <div className="text-lg font-semibold cursor-pointer">About Us</div>
          <div className="text-lg font-semibold cursor-pointer">Contact</div>
        </div>
        <Button label="Login/Signup" onClick={() => {}} type="purple" />
      </div>
    </div>
  );
};

export default Nav;
