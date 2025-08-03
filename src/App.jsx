import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HashRouter, Routes, Route } from "react-router-dom";

import MyNav from "./components/MyNav.jsx";
import MyFooter from "./components/MyFooter.jsx";
import Welcome from "./components/Welcome.jsx";
import AllTheBooks from "./components/AllTheBooks.jsx";
import CommentArea from "./components/CommentArea.jsx";
import BookDetails from "./components/BookDetails.jsx";
import NotFound from "./components/NotFound.jsx";

import { ThemeContext } from "./context/ThemeContext.jsx";
import "./assets/app.css";

function App() {
    const { theme } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");

    return (
        <HashRouter>
            <div className="d-flex flex-column min-vh-100">
                <MyNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <main
                    className="pb-5 flex-grow-1"
                    style={{
                        backgroundColor:
                            theme === "light" ? "white" : "rgb(38 43 48)",
                    }}
                >
                    <Routes>
                        <Route
                            index
                            element={
                                <>
                                    <Welcome />

                                    <Container fluid className="px-3">
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <AllTheBooks
                                                    searchTerm={searchTerm}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                    setSelectedTitle={
                                                        setSelectedTitle
                                                    }
                                                />
                                            </Col>

                                            {/* Per schermi medi e piccoli la visualizzazione dei commenti è nascosta. Sarà comunque possibile consultare i commenti nei dettagli del libro. */}
                                            <Col
                                                xs={4}
                                                className="d-none d-md-block"
                                            >
                                                <aside className="sidebar">
                                                    {selected ? (
                                                        <CommentArea
                                                            bookId={selected}
                                                            bookTitle={
                                                                selectedTitle
                                                            }
                                                        />
                                                    ) : (
                                                        <>
                                                            <h2
                                                                className={`text-center ${
                                                                    theme ===
                                                                    "dark"
                                                                        ? "text-light"
                                                                        : "text-dark"
                                                                }`}
                                                            >
                                                                Commenti
                                                            </h2>

                                                            <hr
                                                                className={
                                                                    "border-2 border-secondary"
                                                                }
                                                            />
                                                            <p
                                                                className={`text-center ${
                                                                    theme ===
                                                                    "dark"
                                                                        ? "text-light"
                                                                        : "text-dark"
                                                                }`}
                                                            >
                                                                Clicca sulla
                                                                copertina di un
                                                                libro per
                                                                visualizzare le
                                                                recensioni degli
                                                                utenti!
                                                            </p>
                                                        </>
                                                    )}
                                                </aside>
                                            </Col>
                                        </Row>
                                    </Container>
                                </>
                            }
                        />
                        <Route
                            path="/details/:asin"
                            element={<BookDetails />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <MyFooter />
            </div>
        </HashRouter>
    );
}

export default App;
