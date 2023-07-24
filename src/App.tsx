import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/root";
import BookDetailsPage from "./pages/bookDetail";
import { Page404 } from "./pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootPage,
  },
  {
    path: "/:idd/:superId",
    Component: BookDetailsPage,
  },
  {
    path: "*",
    Component: Page404,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
