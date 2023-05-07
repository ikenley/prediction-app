import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./shared/Footer";
import { AuthContextProvider } from "./auth/AuthContext";
import ScrollToTop from "./shared/ScrollToTop";
import AboutPage from "./about/AboutPage";
import PredictionPage from "./prediction/PredictionPage";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className="app">
          <ScrollToTop />
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/predictions">
              <PredictionPage />
            </Route>
            <Route path="/p/:defaultPredictionId">
              <PredictionPage />
            </Route>
            <Route path="/">
              <PredictionPage />
            </Route>
          </Switch>

          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
