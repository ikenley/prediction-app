import React, { useMemo } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import { Button } from "react-bootstrap";
import { Column } from "react-table";
import DataGrid, { GridCell } from "../shared/grid/DataGrid";
import { SharedPrediction } from "../types";

type Props = {
  isLoading: boolean;
  sharedPredictions: SharedPrediction[];
};

const PredictionGrid = ({ isLoading, sharedPredictions }: Props) => {
  const columns: Column<any>[] = useMemo(() => {
    const cols = [
      {
        Header: "Name",
        accessor: "name",
        width: 200,
        Cell: ({ row, value }: any) => {
          const { user } = row.original as SharedPrediction;
          const fullName = `${user.firstName} ${user.lastName}`;
          return (
            <div className="ellipsis w-100" title={fullName}>
              {fullName}
            </div>
          );
        },
      },
      {
        Header: "Created On",
        headerClassName: "text-center",
        accessor: "createdOn",
        Cell: ({ value }: any) => {
          const date = new Date(value);
          return (
            <div className="text-center">{`${
              date.getUTCMonth() + 1
            }/${date.getUTCDate()}/${date.getUTCFullYear()}`}</div>
          );
        },
      },
      {
        Header: "Probability",
        headerClassName: "text-center",
        accessor: "probability",
        Cell: ({ value }: any) => <GridCell value={value} format="0%" />,
      },
    ];

    return cols;
  }, []);

  return (
    <div className="shared-prediction-grid">
      {isLoading ? (
        <Skeleton height={420} />
      ) : sharedPredictions && sharedPredictions.length > 0 ? (
        <DataGrid columns={columns} data={sharedPredictions} rowHeight={40} />
      ) : (
        <div className="alert alert-secondary text-center">
          No shared predictions exist
        </div>
      )}
    </div>
  );
};

export default PredictionGrid;
