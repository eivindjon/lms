import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Fade, TextArea } from "react-bootstrap";
import Axios from "axios";
import DismissableAlert from "./DismissableAlert";
import { PencilSquare } from "react-bootstrap-icons";

function LogCustomModal(props) {
  const [show, setShow] = useState(false);
  const [postContent, setPostContent] = useState(props.postContent);
  const postId = props.postId;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function editPost(content, postId) {
    const updatedLesson = {
      lessonContent: content,
      postId: postId,
    };
    Axios.post(`http://localhost:3001/updatelesson`, updatedLesson).then(
      (res) => {
        if (res.status === 200) {
          console.log("Post Edited successfully");
        } else if (res.status === 400) {
          console.log("No good status");
        }
      }
    );
  }

  function handleChange(e) {
    setPostContent(e.target.value);
  }
  function handleEdit() {
    editPost(postContent);
  }

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <PencilSquare style={{ color: "#000000" }} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <DismissableAlert in={Fade} />
        <Modal.Header closeButton>
          <Modal.Title>Hva skal det være:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            style={{ "min-width": "100%", "min-height": "10em" }}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Lukk
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Lagre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogCustomModal;
