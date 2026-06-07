import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./shared/Footer";
import { AuthContextProvider } from "./auth/AuthContext";
import ScrollToTop from "./shared/ScrollToTop";
import AboutPage from "./about/AboutPage";
import PredictionPage from "./prediction/PredictionPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <div className="app">
            <ScrollToTop />
            <Routes>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/predictions" element={<PredictionPage />} />
              <Route path="/p/:defaultPredictionId" element={<PredictionPage />} />
              <Route path="/share/:sharedPredictionId" element={<PredictionPage />} />
              <Route path="*" element={<PredictionPage />} />
            </Routes>

            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
