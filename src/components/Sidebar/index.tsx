import React from "react";
import Avatar from "../../assets/image-avatar.jpg";
import Logo from "../..//assets/logo.svg";
import sun from "../../assets/icon-sun.svg";

const Sidebar: React.FC = () => {
  return (
    <div className="w-24 h-screen z-[51] bg-drawer-bg rounded-tr-[30px] flex flex-col justify-between items-center pb-6">
      <div className="bg-primary-purple relative w-full h-24 flex items-center justify-center rounded-r-[30px]">
        <span className="text-white text-2xl font-bold">
          <span className="absolute z-50  top-[30px] left-[30px]">
            <img src={Logo} alt="Logo" />
          </span>
          <span className="absolute rounded-tl-[30px] rounded-br-[30px] top-[45px] left-0 bg-purple h-12 w-full z-10" />
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            {/* <span className="text-white text-xl">I</span> */}
            <img src={sun} alt="sun" />
          </div>
        </div>

        <span className="w-24 h-0.5 bg-gray-600"></span>

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
