import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renders all resource icons", () => {
    const icons = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/199c9a3c64fa87237dabe74b1aff1fe617935141f37a07ba364b7012e90e628c?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "First icon" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "Second icon" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "Third icon" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0828515f09127d365461d17e1036e88788811bd5c0258116139d171a870fbe56?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "Fourth icon" },
    ];

    render(<Footer />);

    icons.forEach((icon) => {
        const imgElement = screen.getByAltText(icon.alt);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", icon.src);
    });
});

test("renders the 'Resources' heading", () => {
    render(<Footer />);

    const headingElement = screen.getByRole("heading", { name: /resources/i });
    expect(headingElement).toBeInTheDocument();
});

test("renders the 'About' paragraph", () => {
    render(<Footer />);

    const paragraphElement = screen.getByText(/about/i);
    expect(paragraphElement).toBeInTheDocument();
});

test("renders the copyright text", () => {
    render(<Footer />);

    const copyrightElement = screen.getByText(/© pinbox/i);
    expect(copyrightElement).toBeInTheDocument();
});
