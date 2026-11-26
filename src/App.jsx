import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RouteProtegee from "./components/RouteProtegee";
import ErrorBoundary from "./components/ErrorBoundary";
import { useTickets } from "./context/TicketsContext";
import "./App.css";

const Login = lazy(() => import("./pages/Login"));
const Accueil = lazy(() => import("./pages/Accueil"));
const Tickets = lazy(() => import("./pages/Tickets"));
const Kanban = lazy(() => import("./pages/Kanban"));
const NouveauTicket = lazy(() => import("./pages/NouveauTicket"));
const DetailTicket = lazy(() => import("./pages/DetailTicket"));
const ModifierTicket = lazy(() => import("./pages/ModifierTicket"));
const Page404 = lazy(() => import("./pages/Page404"));

function App() {
  const { notification } = useTickets();

  return (
    <div className="app-container">
      <Header />
      {notification && <div className="notification-toast">{notification}</div>}
      <main className="main-content">
        <Suspense fallback={<p className="message-info">Chargement de la page...</p>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RouteProtegee />}>
              <Route path="/" element={<Accueil />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route
                path="/kanban"
                element={
                  <ErrorBoundary>
                    <Kanban />
                  </ErrorBoundary>
                }
              />
              <Route path="/tickets/nouveau" element={<NouveauTicket />} />
              <Route path="/tickets/:id" element={<DetailTicket />} />
              <Route path="/tickets/:id/modifier" element={<ModifierTicket />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
