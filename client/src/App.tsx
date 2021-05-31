import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./shared/Footer";
import { AuthContextProvider } from "./auth/AuthContext";
import { SessionContextProvider } from "./session/SessionContext";
import ScrollToTop from "./shared/ScrollToTop";
import OverviewPage from "./overview/OverviewPage";

function App() {
  return (
    <AuthContextProvider>
      <SessionContextProvider>
        <Router>
          <div className="app">
            <ScrollToTop />
            <Switch>
              {/* <Route path="/foo">
                <FooPage />
              </Route> */}
              <Route path="/">
                <OverviewPage />
              </Route>
            </Switch>

            <Footer />
          </div>
        </Router>
      </SessionContextProvider>
    </AuthContextProvider>
  );
}

export default App;
