import ReactDOM from "react-dom/client";
// import App from './App.tsx'
// import Home from './components/Home.tsx'
import App from "./App.tsx";
import Activity from "./components/Activity.tsx";
// import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import Admin from "./components/Admin/Admin.tsx";
import AdminReviews from "./components/Admin/Review Tab/AdminReviews.tsx";
import Preview from "./components/Preview.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/reviews",
    element: <AdminReviews />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
