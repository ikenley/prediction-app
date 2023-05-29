import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import numeral from "numeral";
import { toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "react-query";
import { Prediction, defaultPrediction } from "../types";
import { Today, QueryKey } from "../constants";
import SharedPredictionPanel from "./SharedPredictionPanel";

// Modal that allows view/edit/delete Prediction

type Props = {
  selPrediction: Prediction | null;
  selectPrediction: (prediction: Prediction | null) => void;
  updatePrediction: (prediction: Prediction) => Promise<any>;
  deletePrediction: (prediction: Prediction) => Promise<any>;
};

// No operation for handling read-only inputs
const noOp = () => {};

const PredictionEditor = ({
  selPrediction,
  selectPrediction,
  updatePrediction,
  deletePrediction,
}: Props) => {
  const [tmpPrediction, setTmpPrediction] = useState<Prediction>(
    defaultPrediction
  );
  const shareLinkRef = useRef<HTMLInputElement>(null);

  const predictionId = selPrediction?.id || "";

  const predictionDetail = useQuery<Prediction>(
    [QueryKey.prediction, predictionId],
    async () => {
      const res = await axios.get(`/api/prediction/by-id/${predictionId}`);
      return res.data;
    },
    { enabled: predictionId !== "" }
  );

  const closeModal = useCallback(() => {
    selectPrediction(null);
  }, [selectPrediction]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, type } = e.currentTarget;
      let value: any = e.currentTarget.value;

      if (type === "date") {
        value = new Date(value);
      } else if (type === "checkbox") {
        value = e.currentTarget.checked;
      }

      setTmpPrediction((p) => {
        return { ...p, [name]: value };
      });
    },
    [setTmpPrediction]
  );

  const handleUpdate = useCallback(async () => {
    await updatePrediction(tmpPrediction);
    closeModal();
  }, [tmpPrediction, closeModal, updatePrediction]);

  const confirmDelete = useCallback(() => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${tmpPrediction.name}?`
    );

    if (shouldDelete) {
      deletePrediction(tmpPrediction);
    }
  }, [tmpPrediction, deletePrediction]);

  const copyToClipboard = useCallback(
    (e: any) => {
      if (!shareLinkRef.current) {
        return;
      }
      shareLinkRef.current.select();
      navigator.clipboard.writeText(shareLinkRef.current.value);
      e.target.focus();
      toast.success("Share link copied to clipboard");
    },
    [shareLinkRef]
  );

  // When prediction prop changes, reload tmpPrediction
  useEffect(() => {
    if (!selPrediction) {
      setTmpPrediction(defaultPrediction);
      return;
    }

    // Create shallow copy of prediction and set to temp
    const tmp = { ...selPrediction };
    tmp.revisitOn = new Date(tmp.revisitOn);
    setTmpPrediction(tmp);
  }, [selPrediction, setTmpPrediction]);

  if (!selPrediction) {
    return null;
  }

  return (
    <Modal show={true} onHide={closeModal} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>View Prediction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formCreateName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="input"
                name="name"
                value={tmpPrediction.name}
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
            <Col sm={1}>{numeral(tmpPrediction.probability).format("0%")}</Col>
            <Col sm={9}>
              <Form.Control
                type="range"
                min={0}
                max={1}
                step={0.01}
                name="probability"
                value={tmpPrediction.probability}
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
                value={tmpPrediction.revisitOn.toISOString().substr(0, 10)}
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
                value={tmpPrediction.description || ""}
                onChange={noOp}
                placeholder="Any additional detail..."
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="predictionEditorCanShare">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check
                label="Allow sharing of this prediction"
                name="canShare"
                checked={tmpPrediction.canShare === true}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          {tmpPrediction.canShare && (
            <Form.Group as={Row} controlId="predictionEditorShareLink">
              <Form.Label column sm={2}>
                Share Link
              </Form.Label>
              <Col sm={10}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <Button
                      onClick={copyToClipboard}
                      title="Copy share link to clipboard"
                    >
                      <i className="fas fa-copy"></i>
                    </Button>
                  </div>
                  <Form.Control
                    ref={shareLinkRef}
                    name="revisitOn"
                    value={`${global.location.protocol}//${global.location.host}/share/${tmpPrediction.id}`}
                    onChange={noOp}
                    readOnly
                  />
                </div>
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check
                label="Looking back, was this true?"
                name="isTrue"
                checked={tmpPrediction.isTrue === true}
                onChange={handleChange}
                disabled={tmpPrediction.revisitOn > Today}
              />
            </Col>
          </Form.Group>
        </Form>
        <hr />
        <SharedPredictionPanel
          isLoading={predictionDetail.isLoading}
          sharedPredictions={predictionDetail.data?.sharedPredictions || []}
        />
        <hr />
        <Button variant="secondary" onClick={confirmDelete}>
          <i className="fas fa-trash" /> Delete
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PredictionEditor;
