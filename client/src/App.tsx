import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./shared/Footer";
import { AuthContextProvider } from "./auth/AuthContext";
import ScrollToTop from "./shared/ScrollToTop";
import PredictionPage from "./prediction/PredictionPage";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="app">
          <ScrollToTop />
          <Switch>
            <Route path="/p/:defaultPredictionId">
              <PredictionPage />
            </Route>
            <Route path="/">
              <PredictionPage />
            </Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
