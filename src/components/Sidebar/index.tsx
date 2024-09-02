import React from "react";
import Avatar from "../../assets/image-avatar.jpg";
import Logo from "../..//assets/logo.svg";
import sun from "../../assets/icon-sun.svg";

const Sidebar: React.FC = () => {
  return (
    <div className="w-full lg:w-24 lg:h-screen z-[51] bg-drawer-bg lg:rounded-tr-[30px] flex lg:flex-col flex-row justify-between items-center lg:pb-6 pr-6 lg:pr-0">
      <div className="bg-primary-purple relative w-24 lg:w-full h-24 flex items-center justify-center rounded-r-[30px]">
        <span className="text-white text-2xl font-bold">
          <span className="absolute z-50  top-[30px] left-[30px]">
            <img src={Logo} alt="Logo" />
          </span>
          <span className="absolute rounded-tl-[30px] rounded-br-[30px] top-[45px] left-0 bg-purple h-12 w-full z-10" />
        </span>
      </div>
      <div className="flex lg:flex-col flex-row gap-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            {/* <span className="text-white text-xl">I</span> */}
            <img src={sun} alt="sun" />
          </div>
        </div>

        <span className="lg:w-24 lg:h-0.5 w-0.5 bg-gray-600"></span>

        <div className="w-12 h-12 mx-auto rounded-full overflow-hidden border border-gray-600">
          <img
            src={Avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
