import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <h1>Welcome to your Mail Box</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
