import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import Ultrasound_video from "../app/ultrasound_video_backend/page";
import axios from "axios";

jest.mock("axios");
jest.useFakeTimers(); // Fake timer to resemble the set interval in component

describe("Ulrasound Video Page", () => {
  it("renders the Ultrasound video component", () => {
    render(<Ultrasound_video />);

    expect(
      screen.getByRole("button", { name: "Start Recording" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "New Patient ?" })
    ).toBeInTheDocument();
  });

  it("it renders the video of the ultrasound from backend along with buttons", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { fileName: "patient-13.mp4", message: "Recording Saved" },
    });

    render(<Ultrasound_video />);
    const video = expect(screen.getByTestId("video_check"));
    video.toHaveAttribute("src", "http://localhost:3001/video/stream");
    const record_button = screen.getByRole("button", {
      name: "Start Recording",
    });

    fireEvent.click(record_button);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/video/record",
      {},
      { withCredentials: true }
    );
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Recording in Progress..." })
      ).toBeInTheDocument();
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Recording Saved" })
      ).toBeInTheDocument();
    });
  });


});
