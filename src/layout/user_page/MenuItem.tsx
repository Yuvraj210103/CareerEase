import { FC } from "react";
import { useNavigate } from "react-router-dom";

export interface ItemProps {
  name: string;
  icon: JSX.Element;
  path: string;
}

const MenuItem: FC<ItemProps> = ({ name, icon, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  const currentLocation = window.location.pathname;

  return (
    <div
      onClick={handleClick}
      className={`mx-4 px-4 py-3 ${
        path === currentLocation
          ? "bg-sidebarMenuHoverBg"
          : "hover:bg-sidebarMenuHoverBg"
      } bg-sidebarMenuBg text-surface rounded flex justify-between items-center cursor-pointer`}
    >
      <div>{icon}</div>
      <div className="h-full  text-lg w-full pl-5 line-clamp-1">{name}</div>
      <div className="h-6 w-6"></div>
    </div>
  );
};

export default MenuItem;
