import { Outlet } from "react-router-dom";

function Table() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

export default Table;
