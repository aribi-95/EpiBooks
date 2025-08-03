import { Col, Container, Row } from "react-bootstrap";
import sadCat from "../assets/404-sad-cat.png";

function NotFound() {
    return (
        <Container className="mt-4">
            <h2 className="text-center">
                Oh, no!
                <br />
                Sembra che tu abbia navigato su una rotta non disponibile.
            </h2>
            <Row className="justify-content-center">
                <Col md={8}>
                    <img src={sadCat} alt="Sad cat" className="w-100" />
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;
