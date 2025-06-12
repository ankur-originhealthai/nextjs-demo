import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import About from "../app/about/page";


describe("About Page", () => {
  it("renders input fields and login button", () => {
    render(<About />);
    expect(screen.getByText("Improve your ultrasound experience with us.")).toBeInTheDocument();
    
  });
})
