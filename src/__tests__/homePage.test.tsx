import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import About from "../app/about/page";
import App from "next/app";
import Home from "../app/page";


describe("Home Page", () => {
  it("renders the home page with Start Ultrasound button", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to Radiology Department")).toBeInTheDocument();
    expect(screen.getByRole("button", {name : "Start Ultrasound"}))
    expect(screen.getByRole("link", {name : "Start Ultrasound"}))
    expect(screen.getByRole('link')).toHaveProperty('href', 'http://localhost/patient')

  });
})
