import { useState, useEffect, useContext } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

import { ThemeContext } from "../context/ThemeContext";
import { Container, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const authorizationToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhZDdiNDk2OGRlNTAwMTU1MmEzYzIiLCJpYXQiOjE3NTQyMTQyOTcsImV4cCI6MTc1NTQyMzg5N30.yVsnm6KVdVdf4Vt8XfswH0RKmw24q-B2ympMde4waR8";

function CommentArea({ bookId, bookTitle }) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { theme } = useContext(ThemeContext);
    const titleThemeClass = theme === "dark" ? "title-dark" : "title-light";
    const location = useLocation();
    const isHome = location.pathname === "/";

    /* ---------------- API ---------------- */
    // Get
    useEffect(() => {
        if (!bookId) return;
        setIsLoading(true);

        fetch(
            `https://striveschool-api.herokuapp.com/api/books/${bookId}/comments`,
            {
                headers: { Authorization: authorizationToken },
            }
        )
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, [bookId]);

    // Aggiungere un commento
    const addComment = (newComment) => {
        fetch("https://striveschool-api.herokuapp.com/api/comments/", {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Errore invio commento");
                return res.json();
            })
            .then((savedComment) => {
                setComments((prev) => [...prev, savedComment]);
            })
            .catch((err) => console.error(err));
    };

    // Modificare un commento
    const updateComment = (id, updatedData) => {
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
            method: "PUT",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Errore aggiornamento commento");
                return res.json();
            })
            .then((updatedComment) => {
                setComments((prev) =>
                    prev.map((comment) =>
                        comment._id === id ? updatedComment : comment
                    )
                );
            })
            .catch((err) => console.error(err));
    };

    // Eliminare un commento
    const deleteComment = (id) => {
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Errore cancellazione commento");
                setComments((prev) => prev.filter((c) => c._id !== id));
            })
            .catch((err) => console.error(err));
    };

    /* ---------------- PARTI DA MONTARE ---------------- */
    const commentList = (
        <div className="p-3">
            {isLoading ? (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="info" />
                </div>
            ) : (
                <CommentList
                    reviews={comments}
                    onUpdateComment={updateComment}
                    onDeleteComment={deleteComment}
                />
            )}
        </div>
    );

    const addCommentArea = (
        <div className="p-3">
            <h5
                className={`mb-4 text-center add-review-title ${titleThemeClass}`}
            >
                Inserisci la tua recensione!
            </h5>
            <AddComment bookId={bookId} onAddComment={addComment} />
        </div>
    );

    const divider = <hr className="border-2 border-secondary" />;

    /* ---------------- RETURN ---------------- */
    return isHome ? (
        <>
            {/* Visualizzazione su schermata home */}
            <h2
                className={`text-center ${
                    theme === "dark" ? "text-light" : "text-dark"
                }`}
            >
                Commenti
            </h2>

            {divider}

            <h4
                className={`text-center fw-semibold fst-italic ${titleThemeClass}`}
            >
                {bookTitle}
            </h4>

            {divider}
            {commentList}
            {divider}
            {addCommentArea}
        </>
    ) : (
        <>
            {/* Visualizzazione su schermata dettaglio libro */}
            {divider}
            <Container>
                <h3
                    className={`text-decoration-underline text-center ${
                        theme === "dark" ? "text-light" : "text-dark"
                    }`}
                >
                    Commenti
                </h3>
                {commentList}
                {divider}
                {addCommentArea}
            </Container>
        </>
    );
}

export default CommentArea;
