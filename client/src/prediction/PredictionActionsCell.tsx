import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { Prediction } from "../types";

// Actions cell within PredictionsGrid

type Props = {
  prediction: Prediction;
  deletePrediction: (prediction: Prediction) => Promise<any>;
};

const PredictionActionsCell = ({ prediction, deletePrediction }: Props) => {
  const { name } = prediction;

  const confirmDelete = useCallback(() => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${prediction.name}?`
    );

    if (shouldDelete) {
      deletePrediction(prediction);
    }
  }, [prediction, deletePrediction]);

  return (
    <div className="prediction-actions-cell text-center">
      <Button variant="secondary" size="sm" title={`Edit ${name}`}>
        <i className="fas fa-edit" />
      </Button>{" "}
      <Button
        variant="secondary"
        size="sm"
        onClick={confirmDelete}
        title={`Edit ${name}`}
      >
        <i className="fas fa-trash" />
      </Button>
    </div>
  );
};

export default PredictionActionsCell;
