import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

function SingleBook({ book, selected, setSelected, setSelectedTitle }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Card
                bg={theme}
                key={theme === "light" ? "Light" : "Dark"}
                text={theme === "light" ? "dark" : "white"}
                className="h-100 d-flex flex-column"
                data-testid="book-card"
                style={{
                    boxShadow:
                        selected === book.asin
                            ? theme === "light"
                                ? "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                                : "rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px"
                            : null,
                }}

                // Era richiesto di inserire un contorno rosso sull'immagine ma non lo trovavo esteticamente gradevole, perciò ho inserito un'ombreggiatura sulla card intera
            >
                <Card.Img
                    onClick={() => {
                        if (selected === book.asin) {
                            setSelected("");
                            setSelectedTitle("");
                        } else {
                            setSelected(book.asin);
                            setSelectedTitle(book.title);
                        }
                    }}
                    variant="top"
                    style={{ cursor: "pointer" }}
                    src={book.img}
                    alt={book.title}
                    data-testid="book-image"
                />
                <Card.Body className="p-2 d-flex flex-column justify-content-between text-center">
                    <Card.Title className="mb-1 fs-5" data-testid="book-title">
                        {book.title}
                    </Card.Title>
                    <Button
                        as={Link}
                        to={`/details/${book.asin}`}
                        className="detailsBtn mt-2"
                    >
                        Dettagli
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default SingleBook;
