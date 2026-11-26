import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RouteProtegee({ rolesAutorises }) {
  const { utilisateur } = useAuth();
  const location = useLocation();

  if (!utilisateur) {
    return <Navigate to="/login" replace state={{ depuis: location.pathname }} />;
  }

  if (rolesAutorises && !rolesAutorises.includes(utilisateur.role)) {
    return (
      <div className="page-acces-refuse">
        <h2>Accès refusé</h2>
        <p>Vous n'avez pas les permissions nécessaires pour consulter cette page.</p>
      </div>
    );
  }

  return <Outlet />;
}

export default RouteProtegee;
