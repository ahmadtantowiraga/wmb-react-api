import Login from "../Authentication/Login";
import Dashboard from "../Dashboard/Dashboard";
import Menu from "../Menu/Menu";
import MenuForm from "../Menu/component/MenuForm";
import MenuList from "../Menu/component/MenuList";
import Table from "../Table/Table";
import TableForm from "../Table/component/TableForm";
import TableList from "../Table/component/TableList";
import DashboardLayout from "../layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([

    {
      path: "/login",
      element: <Login />,
    },
  
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "menu",
          element: <Menu />,
          children: [
            {
              index: true,
              element: <MenuList />,
            },
            {
              path: "new",
              element: <MenuForm />,
            },
            {
              path: "update",
              element: <MenuForm />,
            },
          ],
        },
        {
          path: "table",
          element: <Table />,
          children: [
            {
              index: true,
              element: <TableList />,
            },
            {
              path: "new",
              element: <TableForm />,
            },
          ],
        },
      ],
    },
  ]);
  
  export default router;
  