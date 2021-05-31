import React, { useState, useEffect, useContext, useCallback } from "react";
import { Alert } from "react-bootstrap";
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
        <Alert variant="dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum
          porttitor risus. Aenean id nibh et libero aliquam maximus sit amet
          elementum ipsum. Proin vestibulum leo sit amet porta placerat. In hac
          habitasse platea dictumst. Aenean mollis leo eu purus pulvinar, a
          interdum urna iaculis. Proin ac orci lacus.
        </Alert>
      </main>
      <Tour
        steps={tourSteps}
        show={showTour}
        setShow={setShowTour}
        launchCookiePrefix="overview"
      />
    </div>
  );
};

export default OverviewPage;
