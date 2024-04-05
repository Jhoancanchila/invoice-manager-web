import { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../components/Table";

function Home() {
  
  return (
    <Fragment>
      <Sidebar/>
      <div className="lg:w-[60%] mx-auto mt-40 w-[90%]">
      <Table />

      </div>
    </Fragment>
  );
}

export default Home;