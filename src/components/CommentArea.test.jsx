import { render, screen } from "@testing-library/react";
import CommentArea from "./CommentArea";
import { ThemeContext } from "../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

function renderWithProviders(ui, { theme = "light" } = {}) {
    return render(
        <ThemeContext.Provider value={{ theme }}>
            <MemoryRouter>{ui}</MemoryRouter>
        </ThemeContext.Provider>
    );
}

describe("CommentArea component", () => {
    test("carica e mostra i commenti correttamente dopo la fetch", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => [
                    {
                        comment: "Commento di prova",
                        rate: "5",
                        elementId: "123",
                    },
                ],
            })
        );

        renderWithProviders(
            <CommentArea bookId="123" bookTitle="Libro con commenti" />
        );

        expect(screen.getByText("Libro con commenti")).toBeInTheDocument();

        expect(screen.queryByRole("status")).not.toBeInTheDocument();

        expect(
            screen.getByText("Inserisci la tua recensione!")
        ).toBeInTheDocument();

        const commento = await screen.findByText((content, element) => {
            return content.includes("Commento di prova");
        });
        expect(commento).toBeInTheDocument();

        global.fetch.mockRestore();
    });
});
