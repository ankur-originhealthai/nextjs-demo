import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import SignupForm from "../components/SignupForm";

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


describe("SignUp Form", () => {
  it("renders input fields and signUp button", () => {
    render(<SignupForm/>);
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("emailId")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByText("SignUp")).toBeInTheDocument();
  });


  it("SignUp in with correct credentials", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        data: { id: 1, name: "ranjan" },
      },
    });
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "ranjan" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "thakur" },
    });
    fireEvent.change(screen.getByTestId("emailId"), {
      target: { value: "ranjan@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Ranjan@123" },
    });
    fireEvent.click(screen.getByText("SignUp"));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/user/signUp",
        { emailId: "ranjan@gmail.com", password: "Ranjan@123",
            firstName: "ranjan", lastName: "thakur", disease:"None"
         },
        { withCredentials: true }
      );
    });
   
  });

  it("shows error on existing credentials", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
        isAxiosError: true,
      response: {
        data: {
          message: "User Already exist with this email",
        },
      },
    });
    render(<SignupForm />);
    const consoleLogSpy = jest.spyOn(console, 'log');

    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "ranjan" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "thakur" },
    });
    fireEvent.change(screen.getByTestId("emailId"), {
      target: { value: "ankur@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Ranjan@123" },
    });
    fireEvent.click(screen.getByText("SignUp"));
    await waitFor(() => {
      expect(screen.getByText("User Already exist with this email")).toBeInTheDocument();
    });
    expect(consoleLogSpy).toHaveBeenCalledWith('User Already exist with this email');
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/user/signUp",
        { emailId: "ankur@gmail.com", password: "Ranjan@123",
            firstName: "ranjan", lastName: "thakur", disease:"None"
         },
        { withCredentials: true }
      );
    });
  });
});






