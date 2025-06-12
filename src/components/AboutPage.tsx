"use client";

const AboutPage = () => {
  return (
    <div className="justify-items-center">
      <h1 className="text-2xl">Radiology Department</h1>
      <p className="text-xl text-blue-400 m-2">
        Improve your ultrasound experience with us.
      </p>

      <p className="m-2 font-bold">Workflow of the Project</p>
      <div className="border-2 border-black">
        <ul className="m-2 font-extralight">
          <li>
            Application starts with Login Page where the doctor (Sonographer)
            has to Log In.
          </li>
          <li>
            Then he will be navigated to Home Page where he can select Start
            UltraSound Button.
          </li>
          <li>
            Then he will be prompted with Patient details form where he has to
            fill the patient details.
          </li>
          <li>After this he can start ultrasound and do the recordings.</li>
          <li>Sonographer can view there recordings in Recordings Tab.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
