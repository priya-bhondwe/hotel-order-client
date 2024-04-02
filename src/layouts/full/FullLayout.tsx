import * as React from "react";
import Sidebar from "./SideBar";

interface IFullLayoutProps {}

const FullLayout: React.FunctionComponent<IFullLayoutProps> = (props) => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default FullLayout;
