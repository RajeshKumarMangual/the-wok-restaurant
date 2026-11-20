
import "./App.css";

import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ChatbotLauncher from "./components/common/ChatbotLauncher";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Hide Navbar, Footer and Chatbot on admin and login pages
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <ScrollToTop />

      <AllRoutes />

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <ChatbotLauncher />}
    </>
  );
}

export default App;
