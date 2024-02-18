import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import Home from './components/Home.tsx'
import App from './App.tsx'
import Activity from './components/Activity.tsx'
// import './index.css'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);