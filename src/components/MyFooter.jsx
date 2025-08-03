import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function MyFooter() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>© EpiBooks - WDPT0125</Col>
                </Row>
            </Container>
        </footer>
    );
}

export default MyFooter;
