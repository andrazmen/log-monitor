import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Login, Error, ProtectedRoute } from "./pages";

// loader and action
import { loader as homeLoader } from "./pages/Home";
import { loader as loginLoader } from "./pages/Login";
import { action as loginAction } from "./pages/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      loader: homeLoader,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction(),
      loader: loginLoader,
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
