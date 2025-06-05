//

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import Patient from "../app/patient/page";

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

describe("PatientForm", () => {
  it("renders input fields and submit button", () => {
    render(<Patient />);
    expect(screen.getByTestId("patientId")).toBeInTheDocument();
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("disease")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("Sends the patient's data to backend", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        data: {
          patientId: 12,
          firstName: "Ranjana",
          lastName: "Thakur",
          disease: "None",
          userId: 1,
          ultrasound_video_path: null,
        },
      },
    });
    render(<Patient />);

    fireEvent.change(screen.getByTestId("patientId"), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "Ranjana" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Thakur" },
    });
    fireEvent.change(screen.getByTestId("disease"), {
      target: { value: "None" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/patient/patientData",
        {
          firstName: "Ranjana",
          lastName: "Thakur",
          patientId: 12,
          disease: "None",
        },
        { withCredentials: true }
      );
    });
  });

  it("shows error on existing id", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: {
          message: "Patient Already exist with this Id",
        },
      },
    });
    render(<Patient />);
    const consoleLogSpy = jest.spyOn(console, "log");

    fireEvent.change(screen.getByTestId("patientId"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "Ranjana" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Thakur" },
    });
    fireEvent.change(screen.getByTestId("disease"), {
      target: { value: "None" },
    });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(
        screen.getByText("Patient Already exist with this Id")
      ).toBeInTheDocument();
    });
    //expect(consoleLogSpy).toHaveBeenCalledWith('Patient Already exist with this Id');
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/patient/patientData",
        {
          firstName: "Ranjana",
          lastName: "Thakur",
          patientId: 1,
          disease: "None",
        },
        { withCredentials: true }
      );
    });
  });

  it("shows error on empty field", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: {
          message: "firstName should not be emptylastName should not be empty",
        },
      },
    });
    render(<Patient />);
    const consoleLogSpy = jest.spyOn(console, "log");

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(
        screen.getByText("firstName should not be emptylastName should not be empty")
      ).toBeInTheDocument();
    });
})
});
