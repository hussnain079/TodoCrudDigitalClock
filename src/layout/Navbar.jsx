import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoApp from "../views/TodoApp/TodoApp";
import Clock from "../views/Clock/Clock";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <span><Link to="/">SELTEQ</Link></span>
          <ul>
            <li>
              <Link to="/">TODO</Link>
            </li>
            <li>
              <Link to="/clock">Clock</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/clock" element={<Clock />} />
          <Route path="/" element={<TodoApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Navbar;
