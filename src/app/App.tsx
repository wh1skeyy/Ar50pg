
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "@/app/pages/RegistrationPage";
import SuccessPage from "@/app/pages/SuccessPage";
import FailedPage from "@/app/pages/FailedPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/failed" element={<FailedPage />} />
    </Routes>
  );
}
