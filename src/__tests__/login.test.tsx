import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../app/(auth)/login/components/LoginForm";
import push  from "next/navigation";
import axios from "axios";

jest.mock('axios');
describe("Login", () => {
  it("renders a page with login input fields and a login button", () => {
    render(<LoginForm />);
    const email = screen.getByTestId("email");
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId("password");
    expect(password).toBeInTheDocument();
  });


  it("login with the correct credentials", () => {
    render(<LoginForm />);
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const Login = screen.getByText("Login");
    fireEvent.change(email, { target: { value: "ankur@gmail.com" } });
    fireEvent.change(password, { target: { value: "Ankur@123" } });
    fireEvent.click(Login);
    //expect(push).toHaveBeenCalledWith('/');
  });

  it("Error when incorrect credentials", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
        response: {data: {message: "Invalid Credentials"}},
    })
    render(<LoginForm />);
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const Login = screen.getByText("Login");
    fireEvent.change(email, { target: { value: "ankur@gmail.com" } });
    fireEvent.change(password, { target: { value: "Ankur@14334" } });
    fireEvent.click(Login);
    await waitFor(() => screen.debug())
    //const error =  await screen.findByText("Invalid Credentials");
    expect(axios.post).toHaveBeenCalled()
    //expect(error).toBeInTheDocument();
    

  });


});
