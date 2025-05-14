import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
