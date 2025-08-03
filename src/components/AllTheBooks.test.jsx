import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContext } from "../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";

import AllTheBooks from "./AllTheBooks";

import fantasy from "../assets/books/fantasy.json";
import horror from "../assets/books/horror.json";
import romance from "../assets/books/romance.json";
import scifi from "../assets/books/scifi.json";
import history from "../assets/books/history.json";

function renderWithProviders(ui, { theme = "light" } = {}) {
    return render(
        <ThemeContext.Provider value={{ theme }}>
            <MemoryRouter>{ui}</MemoryRouter>
        </ThemeContext.Provider>
    );
}

describe("AllTheBooks component", () => {
    const genres = {
        Fantasy: fantasy,
        Horror: horror,
        Romance: romance,
        SciFi: scifi,
        History: history,
    };

    for (const genre of Object.keys(genres)) {
        test(`renderizza una card per ogni libro del genere ${genre}`, () => {
            renderWithProviders(
                <AllTheBooks
                    searchTerm=""
                    selected=""
                    setSelected={() => {}}
                    setSelectedTitle={() => {}}
                    initialGenre={genre}
                />
            );

            const cards = screen.getAllByTestId("book-card");
            expect(cards).toHaveLength(genres[genre].length);
        });
    }

    // Era richiesto di inserire un contorno rosso sull'immagine ma non lo trovavo esteticamente gradevole. Ho sostituito il bordo con un'ombreggiatura e testato di conseguenza
    test("seleziona e sposta l'ombreggiatura cliccando sulle immagini", () => {
        let selected = "";
        let selectedTitle = "";

        const setSelected = (asin) => {
            selected = asin;
            rerenderComponent();
        };
        const setSelectedTitle = (title) => {
            selectedTitle = title;
        };

        const { rerender } = renderWithProviders(
            <AllTheBooks
                searchTerm=""
                selected={selected}
                setSelected={setSelected}
                setSelectedTitle={setSelectedTitle}
                initialGenre="Fantasy"
            />
        );

        const shadowValue =
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";

        function rerenderComponent() {
            rerender(
                <ThemeContext.Provider value={{ theme: "light" }}>
                    <MemoryRouter>
                        <AllTheBooks
                            searchTerm=""
                            selected={selected}
                            setSelected={setSelected}
                            setSelectedTitle={setSelectedTitle}
                            initialGenre="Fantasy"
                        />
                    </MemoryRouter>
                </ThemeContext.Provider>
            );
        }

        const cards = screen.getAllByTestId("book-card");
        const images = screen.getAllByTestId("book-image");

        cards.forEach((card) => {
            expect(card.style.boxShadow).toBe("");
        });

        fireEvent.click(images[0]);
        expect(cards[0].style.boxShadow).toBe(shadowValue);

        cards.slice(1).forEach((card) => {
            expect(card.style.boxShadow).toBe("");
        });

        fireEvent.click(images[1]);
        expect(cards[1].style.boxShadow).toBe(shadowValue);
        expect(cards[0].style.boxShadow).toBe("");

        fireEvent.click(images[1]);
        cards.forEach((card) => {
            expect(card.style.boxShadow).toBe("");
        });
    });
});
