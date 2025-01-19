import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./pages/Layout.scss";
import Medic from "./pages/medic/Medic";
import Pacient from "./pages/pacient/Pacient";
import {
  createBrowserRouter,
  RouterProvider,
  //Navigate,
} from "react-router-dom";

// import { useContext } from "react";
// import { AuthContext } from "./context/authContext";

function App() {
  //const {currentUser} = useContext(AuthContext);

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  //};

  const Layout = () => {
    return (
      <div className="layout">
        <div className="header">
          <div className="header_title">
            <h1 className="title">Pet Care</h1>
          </div>
          <h2 className="subtitle">Misiunea noastră e sănătatea animalelor</h2>
          
        </div>
        <div className="buttons">
          <button
            className="btn btn-medic"
            onClick={() => (window.location.href = "/medic")}
          >
            Medici
          </button>
          <button
            className="btn btn-pacient"
            onClick={() => (window.location.href = "/pacient")}
          >
            Pacienți
          </button>
          <button
            className="btn btn-boli"
            onClick={() => (window.location.href = "/boli")}
          >
            Boli
          </button>
          <button
            className="btn btn-medicamente"
            onClick={() => (window.location.href = "/medicamente")}
          >
            Medicamente
          </button>
        </div>
        <footer className="footer">
          <div className="footer-content">
            <p>
              <strong>Pet Care</strong> - Clinica ta veterinară de încredere.
            </p>
            <p>
              <a href="mailto:petcare@yahoo.ro">Contact: petcare@yahoo.ro</a> |{" "}
              <a href="tel:123456789">Nr. Telefon: 0765-456-789</a>
            </p>
            <p>&copy; 2025 Pet Care. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      //(
      element: (
        //<ProtectedRoute>
        <Layout />
      ),
      //</ProtectedRoute>
      // ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/medic",
      element: <Medic />,
    },
    {
      path: "/pacient",
      element: <Pacient />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
