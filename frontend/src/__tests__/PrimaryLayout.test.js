import { render, screen } from "@testing-library/react";
import MyComponent from "../PrimaryLayout";

test("renders the logo", () => {
    render(<MyComponent />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
});

test("renders the navigation items", () => {
    render(<MyComponent />);
    const homeNavItem = screen.getByText("HOME");
    const mapNavItem = screen.getByText("MAP");
    expect(homeNavItem).toBeInTheDocument();
    expect(mapNavItem).toBeInTheDocument();
});

test("renders the social media icons", () => {
    render(<MyComponent />);
    const socialIcons = screen.getAllByAltText(/Social Icon/);
    expect(socialIcons.length).toBe(4);
});

test("renders the footer resources", () => {
    render(<MyComponent />);
    const resources = screen.getByText("Resources");
    expect(resources).toBeInTheDocument();
});

test("renders the footer about section", () => {
    render(<MyComponent />);
    const about = screen.getByText("About");
    expect(about).toBeInTheDocument();
});

test("renders the footer copyright text", () => {
    render(<MyComponent />);
    const copyright = screen.getByText("© Pinbox");
    expect(copyright).toBeInTheDocument();
});
