import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../app/(auth)/login/components/LoginForm";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

jest.mock("axios");
const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../app/store/userStore", () => () => ({
  addUser: jest.fn(),
}));


afterEach(() => {
  jest.resetAllMocks();
});


describe("LoginForm", () => {
  it("renders input fields and login button", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });


  it("logs in with correct credentials", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        data: { id: 1, name: "Ankur" },
      },
    });
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "ankur@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Ankur@123" },
    });
    fireEvent.click(screen.getByText("Login"));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/auth/login",
        { emailId: "ankur@gmail.com", password: "Ankur@123" },
        { withCredentials: true }
      );
    });
   
  });
  it("shows error on invalid credentials", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
        isAxiosError: true,
      response: {
        data: {
          message: "Invalid Credentials",
        },
      },
    });
    render(<LoginForm />);
    const consoleLogSpy = jest.spyOn(console, 'log');

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "ankur@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => {
      expect(screen.getByText("Invalid Credentials")).toBeInTheDocument();
    });
    expect(consoleLogSpy).toHaveBeenCalledWith('Invalid Credentials');
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/auth/login",
      { emailId: "ankur@gmail.com", password: "wrongpass" },
      { withCredentials: true }
    );
  });
});






