import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "react-bootstrap";
import { Column } from "react-table";
import DataGrid from "../shared/grid/DataGrid";
import GridCell from "../shared/grid/GridCell";
import { Prediction } from "../types";

type Props = {
  isLoading: boolean;
  predictions: Prediction[];
  selectPrediction: (prediction: Prediction) => void;
};

const PredictionGrid = ({
  isLoading,
  predictions,
  selectPrediction,
}: Props) => {
  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        width: 150,
        Cell: ({ row, value }: any) => (
          <div>
            <Button
              variant="link"
              size="sm"
              onClick={selectPrediction.bind(null, row.original)}
            >
              {value}
            </Button>
          </div>
        ),
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
    ],
    [selectPrediction]
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
