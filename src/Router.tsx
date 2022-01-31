import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./components/Coin";
import Home from "./components/Home";

interface IRouterProps {
  toggleTheme: () => void;
}

const Router = ({ toggleTheme }: IRouterProps) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`/`} element={<Home toggleTheme={toggleTheme!} />} />
        <Route path={`/:coinId/*`} element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
