import React, { useEffect, useCallback } from "react";
import Joyride, { Step, CallBackProps } from "react-joyride";
import Cookies from "js-cookie";

// Extends the Joyride library and adds defaults

type Props = {
  steps: Step[];
  show: boolean;
  setShow: (show: boolean) => void;
  launchCookiePrefix?: string;
};

const Tour = ({ steps, show, setShow, launchCookiePrefix }: Props) => {
  const handleCallback = useCallback(
    ({ action }: CallBackProps) => {
      if (action === "reset") {
        setShow(false);
      }
    },
    [setShow]
  );

  // Auto-launch if no cookie detected
  useEffect(() => {
    // Skip if no launchCookiePrefix argument passed
    if (!launchCookiePrefix) {
      return;
    }

    const cookieName = `${launchCookiePrefix}_tour_launched`;
    let cookie = Cookies.get(cookieName);

    if (!cookie) {
      setShow(true);
      Cookies.set(cookieName, "true", { expires: 30 });
    }
  }, [launchCookiePrefix, setShow]);

  return (
    <div className="tour">
      <Joyride
        run={show}
        callback={handleCallback}
        steps={steps}
        continuous
        showSkipButton
        locale={{ last: "End Tour" }}
        styles={{
          tooltip: { borderRadius: 0 },
          buttonNext: { borderRadius: 0 },
          spotlight: { borderRadius: 0 },
          tooltipTitle: { textAlign: "left" },
          tooltipContent: { textAlign: "left", padding: "10px 0" },
        }}
      />
    </div>
  );
};

export default Tour;
