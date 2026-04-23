import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Index />} />
        {/* 예시로 만든 없는 파일이라 활성화하면 오류납니다! */}
        {/* <Route path='/detail' element={<Detail />} />
        <Route path='/notice' element={<Notice />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
