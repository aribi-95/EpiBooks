import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { ThemeContext } from "./context/ThemeContext";

const themeValue = {
    theme: "light",
    toggleTheme: () => {},
};

describe("Filtro libri tramite input in MyNav", () => {
    test("filtra la lista di libri mostrata in AllTheBooks", () => {
        render(
            <ThemeContext.Provider value={themeValue}>
                <App />
            </ThemeContext.Provider>
        );

        expect(screen.queryAllByTestId("single-comment")).toHaveLength(0);

        const input = screen.getByPlaceholderText("Cerca un titolo...");
        let books = screen.getAllByTestId("book-title");
        expect(books.length).toBeGreaterThan(1);

        fireEvent.change(input, { target: { value: "dragon" } });

        books = screen.getAllByTestId("book-title");
        expect(books.length).toBeGreaterThan(0);
        books.forEach((book) => {
            expect(book.textContent.toLowerCase()).toContain("dragon");
        });

        fireEvent.change(input, {
            target: { value: "iogjkolgfjgbsdfhbgsjkdf" },
        });
        expect(screen.queryAllByTestId("book-title").length).toBe(0);
    });
});
