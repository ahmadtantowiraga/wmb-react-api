import Login from "../Authentication/Login";
import Dasboard from "../Dashboard/Dashboard";

const router = createBrowserRouter([

    {
      path: "/login",
      element: <Login />,
    },
  
    {
      path: "/",
      element: <Dasboard />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "todo",
          element: <Todo />,
          children: [
            {
              index: true,
              element: <TodoList />,
            },
            {
              path: "new",
              element: <TodoForm />,
            },
            {
              path: "update",
              element: <TodoForm />,
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
          ],
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              index: true,
              element: <AdminList />,
            },
            {
              path: "new",
              element: <AdminForm />,
            },
          ],
        },
        {
          path: "product",
          element: <Product />,
          children: [
            {
              index: true,
              element: <ProductList />,
            },
            {
              path: "new",
              element: <ProductForm />,
            },
            {
              path: "update/:id",
              element: <ProductForm />,
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
          ],
        },
        {
          path: "user",
          element: <UserProfile />,
        },
      ],
    },
  ]);
  
  export default router;
  