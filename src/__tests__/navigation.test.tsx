import { Navigations } from "../components/navigations";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("axios");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: jest.fn(),
}));


afterEach(() => {
  jest.resetAllMocks();
});

describe("Navbar Component", () => {
  it("renders the component with different buttons", async () => {
    render(<Navigations />);

    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeInTheDocument();

    const aboutButton = screen.getByText("About");
    expect(aboutButton).toBeInTheDocument();

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

});
