import React, { useState, useCallback } from "react";
//import {Button} from "react-bootstrap";
//import axios from "axios";
import Navbar from "../shared/Navbar";
//import { AuthContext } from "../auth/AuthContext";
import Tour from "../shared/Tour";
import tourSteps from "./tourSteps";
import CreatePredictionEditor from "../prediction_editor/CreatePredictionEditor";

const OverviewPage = () => {
  const [showTour, setShowTour] = useState<boolean>(false);

  const launchTour = useCallback(() => {
    setShowTour(true);
  }, [setShowTour]);

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
        <CreatePredictionEditor />
      </main>
      <Tour steps={tourSteps} show={showTour} setShow={setShowTour} />
    </div>
  );
};

export default OverviewPage;
