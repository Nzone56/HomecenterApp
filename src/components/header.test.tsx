import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./header";

describe("Header component", () => {
  it("Must render the GitHub icon with the correct link", () => {
    render(<Header />);
    const githubLink = screen.getByRole("link", { name: /my github/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/Nzone56");
  });

  it("Must render the ToggleTheme component", () => {
    render(<Header />);
    const toggle = screen.getByTestId("theme-toggle");

    expect(toggle).toBeInTheDocument();
  });
});
