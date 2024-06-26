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
import ProtectedRoute from "./ProtectedRoute";
import Transaction from "../Transaction/Transaction";
import TransactionList from "../Transaction/components/TransactionList";
import TransactionForm from "../Transaction/components/TransactionForm";
import Customer from "../Customer/Customer";
import CustomerList from "../Customer/component/CustomerList";
import CustomerForm from "../Customer/component/CustomerForm";
import TransactionDetail from "../Transaction/components/TransactionDetail";


const router = createBrowserRouter([

    {
      path: "/login",
      element: <Login />,
    },
  
    {
      path: "/",
      element: <ProtectedRoute><DashboardLayout /> </ProtectedRoute>,
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
              path: "update/:id",
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
            {
                path: "update/:id",
                element: <TableForm />,
              },
          ],
        },
        {
          path: "transaction",
          element: <Transaction />,
          children: [
            {
              index: true,
              element: <TransactionList />,
            },
            {
              path: "new",
              element: <TransactionForm />,
            },
            {
              path: "detail/:id",
              element: <TransactionDetail />,
          },
          ],
        },
        {
          path: "customer",
          element: <Customer />,
          children: [
            {
              index: true,
              element: <CustomerList />,
            },
            {
              path: "new",
              element: <CustomerForm />,
            },
            {
                path: "update/:id",
                element: <CustomerForm />,
              },
          ],
        },
      ],
    },
  ]);
  
  export default router;
  