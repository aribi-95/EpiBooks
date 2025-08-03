import logo from "../assets/logo-text.png";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext } from "react";
import { Navbar, Container, Form } from "react-bootstrap";

import { ThemeContext } from "../context/ThemeContext";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MyNav({ searchTerm, setSearchTerm }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isLight = theme === "light";

    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <Navbar
            expand="md"
            collapseOnSelect
            className={`sticky-top ${
                isLight ? "navbar-light bg-light" : "navbar-dark bg-dark"
            }`}
        >
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="py-0">
                    <img src={logo} className="navLogo" alt="logo" />
                </Navbar.Brand>

                {isHome ? (
                    <>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div className="d-flex justify-content-md-center w-100">
                                <Form
                                    data-bs-theme={theme}
                                    className="w-100 mx-md-5"
                                >
                                    <Form.Control
                                        type="search"
                                        placeholder="Cerca un titolo..."
                                        className="my-3 my-md-0"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </Form>
                            </div>
                        </Navbar.Collapse>

                        <div className="d-flex align-items-center">
                            <Navbar.Toggle
                                className="me-2"
                                aria-controls="basic-navbar-nav"
                            />
                            <button
                                className={`btn themeButton ${
                                    isLight
                                        ? "btn-outline-dark"
                                        : "btn-outline-light"
                                }`}
                                onClick={toggleTheme}
                                aria-label="Cambia tema"
                            >
                                {isLight ? "☀️" : "🌙"}
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        className={`btn themeButton ms-2 ${
                            isLight ? "btn-outline-dark" : "btn-outline-light"
                        }`}
                        onClick={toggleTheme}
                        aria-label="Cambia tema"
                    >
                        {isLight ? "☀️" : "🌙"}
                    </button>
                )}
            </Container>
        </Navbar>
    );
}

export default MyNav;
