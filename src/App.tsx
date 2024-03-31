import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

const router = createBrowserRouter([
{
  path: "/dashboard",
  element: <Dashboard></Dashboard>
},
{
  path: "/",
  element: <Login></Login>,
  errorElement: <div>404 not found</div>
}
]);

interface UserData {
  username: string,
  discordid: string
}

const store = createStore<UserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

function App() {

  return (
    <>
      <AuthProvider store={store}>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;