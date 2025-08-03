import { useParams } from "react-router-dom";
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import fantasy from "../assets/books/fantasy.json";
import horror from "../assets/books/horror.json";
import romance from "../assets/books/romance.json";
import scifi from "../assets/books/scifi.json";
import history from "../assets/books/history.json";

import NotFound from "./NotFound.jsx";
import CommentArea from "./CommentArea.jsx";

import { Col, Container, Row } from "react-bootstrap";

function BookDetails() {
    const { theme } = useContext(ThemeContext);
    const titleThemeClass = theme === "dark" ? "title-dark" : "title-light";

    const { asin } = useParams();
    const books = [...fantasy, ...horror, ...romance, ...scifi, ...history];

    const currentBook = books.find((element) => element.asin === asin);
    console.log(currentBook);

    return !currentBook ? (
        <NotFound />
    ) : (
        <>
            <Container className="pt-3">
                <Row className="align-items-center">
                    <Col md={6} lg={5}>
                        <img
                            className="w-100 pb-3"
                            src={currentBook.img}
                            alt="Book cover"
                        />
                    </Col>

                    <Col
                        md={6}
                        lg={7}
                        className={`${
                            theme === "dark" ? "text-light" : "text-dark"
                        }`}
                    >
                        <h2
                            className={`mb-3 px-2 text-center fw-semibold fst-italic ${titleThemeClass}`}
                        >
                            {currentBook.title}
                        </h2>
                        <p>
                            <b>Prezzo:</b> {currentBook.price}€
                        </p>
                        <p>
                            <b>Descrizione:</b>
                            <br />
                            <span className="fw-light">
                                Questo libro, probabilmente composto da pagine
                                di carta o altro materiale simile, contiene una
                                serie di parole organizzate in modo tale da
                                formare frasi e raccontare una storia, esporre
                                idee o condividere conoscenze. Attraverso una
                                struttura più o meno lineare, invita il lettore
                                a immergersi in un’esperienza che può spaziare
                                dal fantastico al realistico, dal semplice al
                                complesso, offrendo spunti di riflessione,
                                intrattenimento o informazione. In definitiva,
                                un’opera che si presta a molteplici
                                interpretazioni e che, almeno in teoria, ha lo
                                scopo di comunicare qualcosa.
                            </span>
                        </p>
                    </Col>
                </Row>
            </Container>

            <CommentArea
                bookId={currentBook.asin}
                bookTitle={currentBook.title}
            />
        </>
    );
}

export default BookDetails;
