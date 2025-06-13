"use client";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../../store/userStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Ultrasound from "../../components/UltraSound";

/** This is a ultraSound video component that displays the ultrasound video and
 * also provides a record button to start the recording
 *
 * Recording button shows the live data from api that recording was saved completely or not
 *
 * It makes a api call to get the ultrasound video from the backend and also makes a api call to record the video through backend.
 */

const ultrasound = () => {
  return (
    <Ultrasound />
  )
};
export default ultrasound;
