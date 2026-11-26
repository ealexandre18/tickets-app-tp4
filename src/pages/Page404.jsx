import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="page-404">
      <h2>404 - Page non trouvée</h2>
      <p>La page que vous recherchez semble introuvable ou a été déplacée.</p>
      <Link to="/" className="btn-primary">
        Retourner à l'accueil
      </Link>
    </div>
  );
}

export default Page404;
