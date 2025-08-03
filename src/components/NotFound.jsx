import { Col, Container, Row } from "react-bootstrap";
import sadCat from "../assets/404-sad-cat.png";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

function NotFound() {
    const { theme } = useContext(ThemeContext);
    const titleThemeClass = theme === "dark" ? "title-dark" : "title-light";

    return (
        <Container className="mt-4">
            <h2 className={`text-center ${titleThemeClass}`}>
                Oh, no!
                <br />
                Sembra che tu abbia navigato su una rotta non disponibile.
            </h2>
            <Row className="justify-content-center mt-4">
                <Col md={8} lg={6} xl={4}>
                    <img src={sadCat} alt="Sad cat" className="w-100" />
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;
