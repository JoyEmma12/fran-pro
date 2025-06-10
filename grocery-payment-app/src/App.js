import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdutcsPage from "./components/ProductsPage/ProdutcsPage";
import Products from "./components/ProductsPage/Products";
import CartScreen from "./components/ProductsPage/Cartscreen";


function App() {
  return (
    <Router>
      {/* <ProdutcsPage /> */}
      <Routes>
        <Route path="/" element={<ProdutcsPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
