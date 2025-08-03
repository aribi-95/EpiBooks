import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

function SingleComment({ review, onUpdateComment, onDeleteComment }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(review.comment);
    const [editedRate, setEditedRate] = useState(review.rate);

    const handleSave = () => {
        if (editedComment.trim() === "") {
            alert("Il commento non può essere vuoto.");
            return;
        }

        onUpdateComment(review._id, {
            comment: editedComment,
            rate: Number(editedRate),
            elementId: review.elementId,
        });

        setIsEditing(false);
    };

    return (
        <Card className="text-center mb-4 px-4" data-testid="single-comment">
            <Card.Body>
                <Card.Title>
                    {isEditing ? (
                        <>
                            <label
                                htmlFor="editedComment"
                                className="mb-1 fw-normal fs-6 text-secondary"
                            >
                                Commento:
                            </label>
                            <input
                                className="w-100 fw-normal fs-6"
                                id="editedComment"
                                type="text"
                                value={editedComment}
                                onChange={(e) =>
                                    setEditedComment(e.target.value)
                                }
                            />
                        </>
                    ) : (
                        <i>"{review.comment}"</i>
                    )}
                </Card.Title>
                <Card.Subtitle className="mb-3">
                    {isEditing ? (
                        <>
                            <label
                                htmlFor="editedRate"
                                className="mt-2 mb-1 fw-normal text-secondary"
                            >
                                Valutazione: {editedRate}/5 ★
                            </label>
                            <br />
                            <Form.Range
                                className="w-75"
                                id="editedRate"
                                min={1}
                                max={5}
                                value={editedRate}
                                onChange={(e) => setEditedRate(e.target.value)}
                            />
                        </>
                    ) : (
                        `${review.rate}/5 ★`
                    )}
                </Card.Subtitle>
                <Card.Text>
                    {isEditing ? (
                        <>
                            <Button
                                onClick={() => setIsEditing(false)}
                                variant="warning"
                                className="m-1 py-1"
                            >
                                Annulla modifica
                            </Button>

                            <Button
                                onClick={handleSave}
                                variant="success"
                                className="m-1 py-1"
                            >
                                Salva
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant="light"
                                className="m-1 py-1"
                            >
                                Modifica
                            </Button>

                            <Button
                                onClick={() => onDeleteComment(review._id)}
                                variant="danger"
                                className="m-1 py-1"
                            >
                                Elimina
                            </Button>
                        </>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SingleComment;
