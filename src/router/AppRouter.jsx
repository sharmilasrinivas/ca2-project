import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/orders">Orders</Link>
        <Link to="/filter">Filter</Link>
        <Link to="/stats">Stats</Link>
      </nav>

      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;