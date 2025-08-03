import { Container, Alert } from "react-bootstrap";
import logo2 from "../assets/epibooks-logo.png";

function Welcome() {
    return (
        <Container className="p-3">
            <Alert className="myAlert mb-0" variant="info">
                <img src={logo2} className="alertLogo" alt="logo" />
                <h5 className="mb-0 fw-normal">
                    Benvenuto, sfoglia i nostri libri e lasciati ispirare!
                </h5>
            </Alert>
        </Container>
    );
}

export default Welcome;
