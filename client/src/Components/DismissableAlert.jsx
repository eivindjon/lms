import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Alert } from "react-bootstrap";
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
        <Alert variant="success" id="success-dismissable" dismissible onClose={() => setAlert(false)}>
          Fravær lagret! Flink bisk.
        </Alert>
    );
  }
  return <></>;
});

export default DismissableAlert;
