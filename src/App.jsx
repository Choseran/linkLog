import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import Header from "./components/header";
import Footer from "./components/footer";
import JoinForm from "./pages/joinForm";
import JoinSuccess from "./pages/joinSuccess";
import LoginPage from "./pages/login";
import InquiryForm from './pages/inquiryForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/join" element={<JoinForm />} />
        <Route path="/success" element={<JoinSuccess />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/inquiryForm' element={<InquiryForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
