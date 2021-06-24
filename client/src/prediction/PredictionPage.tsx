import React, { useState, useCallback, useEffect, useContext } from "react";
//import {Button} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Prediction } from "../types";
import Navbar from "../shared/Navbar";
import { AuthContext } from "../auth/AuthContext";
import Tour from "../shared/Tour";
import tourSteps from "./tourSteps";
import CreatePredictionModal from "./CreatePredictionModal";
import PredictionEditor from "./PredictionEditor";
import PredictionGrid from "./PredictionGrid";
const PredictionPage = () => {
  const { isAuthorized } = useContext(AuthContext);
  let { defaultPredictionId }: any = useParams();
  const [defaultHasLoaded, setDefaultHasLoaded] = useState<boolean>(false);
  const [showTour, setShowTour] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [selPrediction, setSelPrediction] = useState<Prediction | null>(null);

  const launchTour = useCallback(() => {
    setShowTour(true);
  }, [setShowTour]);

  const createPrediction = useCallback(
    async (prediction: Prediction) => {
      const res = await axios.post("/api/prediction/create", prediction);

      const nextPredictions = [...(predictions || []), res.data];
      setPredictions(nextPredictions);
    },
    [predictions, setPredictions]
  );

  const selectPrediction = useCallback(
    (prediction: Prediction | null) => {
      setSelPrediction(prediction);
    },
    [setSelPrediction]
  );

  const updatePrediction = useCallback(
    async (prediction: Prediction) => {
      const res = await axios.post("/api/prediction/update", prediction);

      const nextPredictions = [...(predictions || [])];
      const ix = nextPredictions.findIndex((p) => p.id === prediction.id);
      nextPredictions[ix] = res.data;
      setPredictions(nextPredictions);
    },
    [predictions, setPredictions]
  );

  const deletePrediction = useCallback(
    async (prediction: Prediction) => {
      setSelPrediction(null);

      await axios.delete(`/api/prediction/${prediction.id}`);

      if (predictions) {
        const nextPredictions = predictions.filter(
          (p) => p.id !== prediction.id
        );
        setPredictions(nextPredictions);
      }
    },
    [predictions, setPredictions]
  );

  // Get Predictions on page load
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    axios.get("/api/prediction/by-user").then((res) => {
      setPredictions(res.data);
    });
  }, [isAuthorized, setPredictions]);

  // Pre-select default Prediction if passed via URL
  useEffect(() => {
    if (
      defaultHasLoaded ||
      !defaultPredictionId ||
      !predictions ||
      predictions.length === 0
    ) {
      return;
    }

    const defaultPrediction = predictions.find(
      (p) => p.id === defaultPredictionId
    );

    if (defaultPrediction) {
      selectPrediction(defaultPrediction);
      setDefaultHasLoaded(true);
    }
  }, [
    defaultPredictionId,
    predictions,
    selectPrediction,
    defaultHasLoaded,
    setDefaultHasLoaded,
  ]);

  return (
    <div className="overview-page">
      <Navbar launchTour={launchTour} />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <div className="jumbotron py-4">
          <h1 className="display-4">Predictions</h1>
          <p className="lead">Make predictions, revisit them, self-assess.</p>
        </div>
        <div className="mb-3">
          <CreatePredictionModal createPrediction={createPrediction} />
        </div>
        <PredictionGrid
          isLoading={predictions === null}
          predictions={predictions || []}
          selectPrediction={selectPrediction}
        />
        <PredictionEditor
          selPrediction={selPrediction}
          selectPrediction={selectPrediction}
          updatePrediction={updatePrediction}
          deletePrediction={deletePrediction}
        />
      </main>
      <Tour steps={tourSteps} show={showTour} setShow={setShowTour} />
    </div>
  );
};

export default PredictionPage;
