import React, { useState, useCallback, useContext, useMemo } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import numeral from "numeral";
import Skeleton from "react-loading-skeleton";
import { Prediction, CreateSharedPredictionRequest } from "../types";
import { AuthContext } from "../auth/AuthContext";
import SharedPredictionPanel from "./SharedPredictionPanel";

// Modal that allows view/edit/delete Prediction

type Props = {
  showModal: boolean;
  closeModal: () => void;
  createSharedPrediction: (req: CreateSharedPredictionRequest) => void;
  isLoading: boolean;
  prediction: Prediction | undefined;
};

// No operation for handling read-only inputs
const noOp = () => {};

const SharedPredictionModal = ({
  showModal,
  closeModal,
  createSharedPrediction,
  isLoading,
  prediction,
}: Props) => {
  const { isAuthorized, userId } = useContext(AuthContext);
  const [probability, setProbability] = useState<number>(0.5);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value: any = e.currentTarget.value;

      setProbability(value);
    },
    [setProbability]
  );

  const canCreateSharedPrediction = useMemo(() => {
    if (!prediction) {
      return false;
    }

    if (!isAuthorized) {
      return false;
    }

    // If this prediction was created by the current user, don't allow
    if (prediction.userId === userId) {
      return false;
    }

    // Don't allow if current user has already created SharedPrediction
    if (prediction.sharedPredictions.some((p) => p.userId === userId)) {
      return false;
    }

    return true;
  }, [userId, isAuthorized, prediction]);

  const handleCreate = useCallback(async () => {
    if (!prediction || !canCreateSharedPrediction) {
      return null;
    }

    createSharedPrediction({
      predictionId: prediction.id,
      probability: probability,
    });
  }, [
    createSharedPrediction,
    prediction,
    probability,
    canCreateSharedPrediction,
  ]);

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      size="lg"
      backdrop="static"
      className="shared-prediction-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Shared Prediction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading || !prediction ? (
          <Skeleton height={420} />
        ) : (
          <Form>
            <Form.Group as={Row} controlId="formCreateName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="input"
                  name="name"
                  value={prediction.name || ""}
                  onChange={noOp}
                  placeholder="Odds a coin flip will come up heads..."
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formCreateProbability"
              className="align-items-center"
            >
              <Form.Label column sm={2}>
                Probability
              </Form.Label>
              <Col sm={1}>{numeral(prediction.probability).format("0%")}</Col>
              <Col sm={9}>
                <Form.Control
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  name="probability"
                  value={prediction.probability}
                  onChange={noOp}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCreateRevisitOn">
              <Form.Label column sm={2}>
                Revisit On
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  name="revisitOn"
                  value={new Date(prediction.revisitOn)
                    .toISOString()
                    .substr(0, 10)}
                  onChange={noOp}
                  placeholder="Odds a coin flip will come up heads..."
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCreateDescription">
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={prediction.description || ""}
                  onChange={noOp}
                  placeholder="Any additional detail..."
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalCheck">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check
                  label="Looking back, was this true?"
                  name="isTrue"
                  checked={prediction.isTrue === true}
                  onChange={noOp}
                  disabled
                />
              </Col>
            </Form.Group>
          </Form>
        )}
        <hr />
        <SharedPredictionPanel
          isLoading={isLoading}
          sharedPredictions={prediction?.sharedPredictions || []}
        />
        {canCreateSharedPrediction ? (
          <div>
            <hr />
            Add My Prediction
            <Form>
              <Form.Group
                as={Row}
                controlId="formSharedWithMeProbability"
                className="align-items-center"
              >
                <Form.Label column sm={2}>
                  Probability
                </Form.Label>
                <Col sm={1}>{numeral(probability).format("0%")}</Col>
                <Col sm={9}>
                  <Form.Control
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    name="probability"
                    value={probability}
                    onChange={handleChange}
                    disabled={!canCreateSharedPrediction}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={!canCreateSharedPrediction}
        >
          Save Prediction
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SharedPredictionModal;
