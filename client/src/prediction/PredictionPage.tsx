import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { useParams, Link } from "react-router-dom";
import { Tabs, Tab, Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { Prediction, CreateSharedPredictionRequest } from "../types";
import { QueryKey } from "../constants";
import Navbar from "../shared/Navbar";
import { AuthContext } from "../auth/AuthContext";
import LoginButton from "../auth/LoginButton";
import usePredictionDetail from "./usePredictionDetail";
import CreatePredictionModal from "./CreatePredictionModal";
import SharedPredictionModal from "./SharedPredictionModal";
import EditPredictionModal from "./EditPredictionModal";
import PredictionGrid from "./PredictionGrid";

const PredictionPage = () => {
  const { isAuthorized, hasLoaded } = useContext(AuthContext);
  const queryClient = useQueryClient();
  let { defaultPredictionId, sharedPredictionId }: any = useParams();
  const [defaultHasLoaded, setDefaultHasLoaded] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [selPrediction, setSelPrediction] = useState<Prediction | null>(null);

  // Shared Prediction
  const sharedPredictionQuery = usePredictionDetail(sharedPredictionId);
  const [showSharedModal, setShowSharedModal] = useState<boolean>(false);
  const closeSharedModal = useCallback(() => {
    setShowSharedModal(false);
  }, [setShowSharedModal]);
  const sharedMutation = useMutation(
    (req: CreateSharedPredictionRequest) => {
      return axios.post("/api/shared-prediction", req);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey, sharedPredictionId]);
      },
    }
  );
  const createSharedPrediction = useCallback(
    (req: CreateSharedPredictionRequest) => {
      sharedMutation.mutate(req);
      setShowSharedModal(false);
      toast.success("Saved prediction");
    },
    [sharedMutation, setShowSharedModal]
  );

  // On page load, if shared prediction link, load SharedPrediction modal
  useEffect(() => {
    if (isAuthorized && sharedPredictionId !== undefined) {
      setShowSharedModal(true);
    }
  }, [isAuthorized, sharedPredictionId, setShowSharedModal]);

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
    if (!hasLoaded) {
      return;
    }

    if (!isAuthorized) {
      setPredictions([]);
      return;
    }

    axios.get("/api/prediction/by-user").then((res) => {
      setPredictions(res.data);
    });
  }, [hasLoaded, isAuthorized, setPredictions]);

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
      <Navbar />
      <main role="main" className="container-xl container-xxl pt-3 pb-5">
        <div className="jumbotron py-2 py-md-3">
          <h1 className="display-5">Predictions</h1>
          <p className="lead">
            Become a superb forecaster: (1) Make predictions (2) Assign a
            probability (3) Revisit <br />
            <Link to="/about">Learn more</Link>
          </p>
        </div>
        <div className="mb-3">
          <CreatePredictionModal createPrediction={createPrediction} />
        </div>
        {hasLoaded ? (
          isAuthorized ? (
            <Tabs
              defaultActiveKey="upcoming"
              transition={false}
              id="prediction-page-tabs"
            >
              <Tab eventKey="upcoming" title="Upcoming">
                <PredictionGrid
                  isLoading={predictions === null}
                  predictions={predictions || []}
                  selectPrediction={selectPrediction}
                  showResolved={false}
                />
              </Tab>
              <Tab eventKey="resolved" title="Resolved">
                <PredictionGrid
                  isLoading={predictions === null}
                  predictions={predictions || []}
                  selectPrediction={selectPrediction}
                  showResolved
                />
              </Tab>
            </Tabs>
          ) : (
            <div>
              <Alert variant="secondary">
                You are not logged in. Consider doing that.
                <hr />
                <LoginButton />
              </Alert>
            </div>
          )
        ) : (
          <Skeleton height={420} />
        )}

        <SharedPredictionModal
          showModal={showSharedModal}
          closeModal={closeSharedModal}
          createSharedPrediction={createSharedPrediction}
          isLoading={sharedPredictionQuery.isLoading}
          prediction={sharedPredictionQuery.data}
        />
        <EditPredictionModal
          selPrediction={selPrediction}
          selectPrediction={selectPrediction}
          updatePrediction={updatePrediction}
          deletePrediction={deletePrediction}
        />
      </main>
    </div>
  );
};

export default PredictionPage;
