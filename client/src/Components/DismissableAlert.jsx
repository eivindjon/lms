import React from "react";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { Alert, Fade, Collapse } from "react-bootstrap";
import "../App.css";

const DismissableAlert = forwardRef((props, ref) => {
  const [alert, setAlert] = useState(false);
  useImperativeHandle(ref, () => ({
    showAlert() {
      setAlert(true);
      // Make alert disappear after 2 seconds.
      const timer = setTimeout(() => {
        setAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    },
  }));

  if (alert) {
    return (
      <Collapse>
        <Alert variant="success" id="success-dismissable" onClose={() => setAlert(false)}>
          <p>Fravær lagret! Flink bisk.</p>
        </Alert>
      </Collapse>
    );
  }
  return <></>;
});

export default DismissableAlert;
