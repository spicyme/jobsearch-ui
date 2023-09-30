import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import User from "./pages/User";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="nav m-3">
          <Link to="/" className="link">
            <button
              className="inline-block bg-blue-200 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 mr-3 mb-2"
            >
              Home
            </button>
          </Link>
          <Link to="/user" className="link">
            <button
              className="inline-block bg-blue-200 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 mr-3 mb-2"
            >
              Users
            </button>
          </Link>
          <Link to="/upload" className="link">
            <button
              className="inline-block bg-blue-200 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 mr-3 mb-2"
            >
              Upload
            </button>
          </Link>
        </nav>
        <main className="h-screen m-5">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
