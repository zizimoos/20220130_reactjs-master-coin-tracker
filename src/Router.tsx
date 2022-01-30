import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./components/Coin";
import Home from "./components/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route
          path={`${process.env.PUBLIC_URL}/:coinId/*`}
          element={<Coin />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
