import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

function AddComment({ bookId, onAddComment }) {
    const { theme } = useContext(ThemeContext);
    const [rangeValue, setRangeValue] = useState(1);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.trim() === "") {
            alert("Devi inserire un commento!");
            return;
        }

        const newComment = {
            comment,
            rate: Number(rangeValue),
            elementId: bookId,
        };

        onAddComment(newComment);

        setComment("");
        setRangeValue(1);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            data-bs-theme={theme}
            className="d-flex flex-column align-items-center"
        >
            <Form.Group className="mb-3 px-5 d-flex flex-column align-items-center">
                <Form.Range
                    min="1"
                    max="5"
                    step="1"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                />
                <Form.Label
                    className={theme === "dark" ? "text-light" : "text-dark"}
                >
                    Valutazione: {rangeValue}/5 ★
                </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Scrivi un commento..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </Form.Group>

            <Button
                className="addCommentButton"
                variant="primary"
                type="submit"
            >
                Inserisci
            </Button>
        </Form>
    );
}

export default AddComment;
