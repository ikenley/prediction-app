import React, { useState, useCallback, useEffect, useContext } from "react";
//import {Button} from "react-bootstrap";
import axios from "axios";
import { Prediction } from "../types";
import Navbar from "../shared/Navbar";
import { AuthContext } from "../auth/AuthContext";
import Tour from "../shared/Tour";
import tourSteps from "./tourSteps";
import CreatePredictionEditor from "../prediction_editor/CreatePredictionEditor";
import PredictionGrid from "./PredictionGrid";

const OverviewPage = () => {
  const { isAuthorized } = useContext(AuthContext);
  const [showTour, setShowTour] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);

  const launchTour = useCallback(() => {
    setShowTour(true);
  }, [setShowTour]);

  const createPrediction = useCallback((prediction: Prediction) => {
    const promise = axios.post("/api/prediction/create", prediction);
    return promise;
  }, []);

  // Get Predictions on page load
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    axios.get("/api/prediction/by-user").then((res) => {
      setPredictions(res.data);
    });
  }, [isAuthorized, setPredictions]);

  return (
    <div className="overview-page">
      <Navbar launchTour={launchTour} />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <div className="jumbotron">
          <h1 className="display-4">Predictions</h1>
          <p className="lead">Make predictions, revisit them, self-assess.</p>
          <hr className="my-4" />
          <p>Coming Soon</p>
        </div>
        <div className="mb-3">
          <CreatePredictionEditor createPrediction={createPrediction} />
        </div>
        <PredictionGrid
          isLoading={predictions === null}
          predictions={predictions || []}
        />
      </main>
      <Tour steps={tourSteps} show={showTour} setShow={setShowTour} />
    </div>
  );
};

export default OverviewPage;
