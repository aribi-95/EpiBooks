import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome component", () => {
    test("renderizza il messaggio di benvenuto", () => {
        render(<Welcome />);

        const message = screen.getByText(/benvenuto, sfoglia i nostri libri/i);

        expect(message).toBeInTheDocument();
    });

    test("renderizza il logo con alt='logo'", () => {
        render(<Welcome />);

        const logoImg = screen.getByAltText("logo");
        expect(logoImg).toBeInTheDocument();
    });
});
