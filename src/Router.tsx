import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./components/Coin";
import Home from "./components/Home";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/:coinId/*`} element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
