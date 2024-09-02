import React from "react";
import Sidebar from "./components/Sidebar";
import Invoice from "./views/invoice";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-main-bg flex">
      <div className="fixed h-full">
        <Sidebar />
      </div>
      <section className="flex-1 px-8 py-12 ml-[90px] lg:ml-0 overflow-y-auto">
        <div className="max-w-screen-lg mx-auto">
          <Invoice />
        </div>
      </section>
    </div>
  );
};

export default App;
