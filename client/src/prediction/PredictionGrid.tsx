import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import DataGrid from "../shared/grid/DataGrid";
import GridCell from "../shared/grid/GridCell";
import { Prediction } from "../types";
import PredictionActionsCell from "./PredictionActionsCell";

type Props = {
  isLoading: boolean;
  predictions: Prediction[];
  deletePrediction: (prediction: Prediction) => Promise<any>;
};

const PredictionGrid = ({
  isLoading,
  predictions,
  deletePrediction,
}: Props) => {
  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        width: 150,
      },
      {
        Header: "Probability",
        headerClassName: "text-center",
        accessor: "probability",
        Cell: ({ value }: any) => <GridCell value={value} format="0%" />,
      },
      {
        Header: "Revisit On",
        headerClassName: "text-center",
        accessor: "revisitOn",
        Cell: ({ value }: any) => {
          const date = new Date(value);
          return (
            <span>{`${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`}</span>
          );
        },
      },
      {
        Header: "Actions",
        headerClassName: "text-center",
        accessor: "id",
        Cell: ({ row }: any) => (
          <PredictionActionsCell
            prediction={row.original}
            deletePrediction={deletePrediction}
          />
        ),
      },
    ],
    [deletePrediction]
  );

  return (
    <div className="market-share-grid">
      {isLoading ? (
        <Skeleton height={420} />
      ) : (
        <DataGrid columns={columns} data={predictions} rowHeight={40} />
      )}
    </div>
  );
};

export default PredictionGrid;
