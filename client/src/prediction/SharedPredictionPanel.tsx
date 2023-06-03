import React from "react";
import { SharedPrediction } from "../types";
import SharedPredictionGrid from "./SharedPredictionGrid";

type Props = {
  isLoading: boolean;
  sharedPredictions: SharedPrediction[];
};

const SharedPredictionPanel = ({ isLoading, sharedPredictions }: Props) => {
  return (
    <div className="shared-prediction-panel py-3">
      Shared Predictions
      <SharedPredictionGrid
        isLoading={isLoading}
        sharedPredictions={sharedPredictions}
      />
    </div>
  );
};

export default SharedPredictionPanel;
