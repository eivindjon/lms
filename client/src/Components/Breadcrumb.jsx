import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";

const navigationCrumb = (props) => {
  const pathname = window.location.pathname.split("/");
  console.log(pathname[1]);

  // TODO: make it createt breadcrumb-items dynamically. Recieve props with navigation.
  return (
    <>
      <Container className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="../">Hjem</Breadcrumb.Item>
          <Breadcrumb.Item active>{ pathname[1] }</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </>
  );
};

export default navigationCrumb;
