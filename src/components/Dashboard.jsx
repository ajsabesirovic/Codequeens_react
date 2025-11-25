import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard komponenta</h1>

      <Outlet />
    </div>
  );
};

export default Dashboard;
