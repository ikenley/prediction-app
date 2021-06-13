import React, { useState, useEffect, useContext, useCallback } from "react";
//import axios from "axios";
import Navbar from "../shared/Navbar";
import { SessionContext } from "../session/SessionContext";
import Tour from "../shared/Tour";
import tourSteps from "./tourSteps";

const OverviewPage = () => {
  const [showTour, setShowTour] = useState<boolean>(false);
  const { session } = useContext(SessionContext);

  const launchTour = useCallback(() => {
    setShowTour(true);
  }, [setShowTour]);

  useEffect(() => {
    if (session.isLoading) {
      //setResult(null);
      return;
    }

    //const sessionId = session.sessionId;
    // axios.get(`/api/Overview/${sessionId}`).then((res) => {
    //   setResult(res.data);
    // });
  }, [session]);

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
      </main>
      <Tour steps={tourSteps} show={showTour} setShow={setShowTour} />
    </div>
  );
};

export default OverviewPage;
