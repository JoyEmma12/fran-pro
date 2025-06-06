import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdutcsPage from "./components/ProductsPage/ProdutcsPage"
import Products from "./components/ProductsPage/Products";


function App() {
  return (
    <Router>
      {/* <ProdutcsPage /> */}
      <Routes>
        <Route path="/" element={<ProdutcsPage />} />
        <Route path="/products" element={<Products />} />

      </Routes>
    </Router>
  );
}

export default App;
