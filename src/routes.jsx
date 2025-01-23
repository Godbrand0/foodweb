import { Navigate } from "react-router-dom";
import HomeSection from "./components/HomeSection";
import ResturantDetails from "./components/ResturantDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const routes = (isLoggedIn, cart, setCart) => [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <HomeSection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/restaurant/:name",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <ResturantDetails cart={cart} setCart={setCart} />
      </ProtectedRoute>
    ),
  },
];

export default routes;
