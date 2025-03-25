import { BrowserRouter, Routes, Route } from "react-router";
import Login from './views/Login/login';
import Mainpage from './views/Page/mainpage'
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
