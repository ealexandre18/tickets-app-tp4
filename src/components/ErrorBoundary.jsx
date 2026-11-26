import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { aUneErreur: false };
  }

  static getDerivedStateFromError() {
    return { aUneErreur: true };
  }

  componentDidCatch(erreur) {
    console.error("Erreur capturée par ErrorBoundary :", erreur);
  }

  reessayer = () => {
    this.setState({ aUneErreur: false });
  };

  render() {
    if (this.state.aUneErreur) {
      return (
        <div className="message-erreur" role="alert">
          <h2>Une erreur est survenue</h2>
          <p>Impossible d'afficher cette section pour le moment.</p>
          <button type="button" className="btn-primary" onClick={this.reessayer}>
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
