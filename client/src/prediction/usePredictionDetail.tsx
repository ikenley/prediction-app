import { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Prediction } from "../types";
import { QueryKey } from "../constants";
import { AuthContext } from "../auth/AuthContext";

/** Hook for fetching the "detail" view of a given Prediction. */
const usePredictionDetail = (predictionId: string | undefined) => {
  const { isAuthorized } = useContext(AuthContext);

  const predictionDetail = useQuery<Prediction>(
    [QueryKey.prediction, predictionId],
    async () => {
      const res = await axios.get(`/api/prediction/by-id/${predictionId}`);
      return res.data;
    },
    { enabled: predictionId !== undefined && isAuthorized }
  );

  return predictionDetail;
};

export default usePredictionDetail;
