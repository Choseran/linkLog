import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import Header from "./components/header";
import Footer from "./components/footer";
import JoinForm from "./pages/joinForm";
import JoinSuccess from "./pages/joinSuccess";
import LoginForm from "./pages/loginForm";
import InquiryForm from "./pages/inquiryForm";
import ContentWrite from "./pages/contentWrite";
// import DetailModal from "./pages/detailModal";

import { AuthProvider } from "./assets/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/join" element={<JoinForm />} />
          <Route path="/success" element={<JoinSuccess />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/inquiry" element={<InquiryForm />} />
          <Route path="/write" element={<ContentWrite />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
