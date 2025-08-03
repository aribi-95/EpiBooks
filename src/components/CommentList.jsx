import { useContext } from "react";
import SingleComment from "./SingleComment";
import { Carousel } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

function CommentList({ reviews, onUpdateComment, onDeleteComment }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            {reviews.length > 0 ? (
                <Carousel data-bs-theme={theme} interval={null}>
                    {reviews.map((review) => (
                        <Carousel.Item key={review._id}>
                            <SingleComment
                                review={review}
                                onUpdateComment={onUpdateComment}
                                onDeleteComment={onDeleteComment}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <h6
                    className={`fw-light text-${
                        theme === "light" ? "dark" : "light"
                    }`}
                    style={{ textAlign: "center" }}
                >
                    Non ci sono ancora commenti, evviva, puoi essere il primo!
                </h6>
            )}
        </>
    );
}

export default CommentList;
