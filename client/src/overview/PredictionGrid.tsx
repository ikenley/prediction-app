import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import DataGrid from "../shared/grid/DataGrid";
import GridCell from "../shared/grid/GridCell";
import { Prediction } from "../types";

type Props = {
  isLoading: boolean;
  predictions: Prediction[];
};

const PredictionGrid = ({ isLoading, predictions }: Props) => {
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
    ],
    []
  );

  return (
    <div className="market-share-grid">
      {isLoading ? (
        <Skeleton height={420} />
      ) : (
        <DataGrid columns={columns} data={predictions} />
      )}
    </div>
  );
};

export default PredictionGrid;
