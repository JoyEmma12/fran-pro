import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdutcsPage from "./components/ProductsPage/ProdutcsPage"


function App() {
  return (
    <Router>
      <ProdutcsPage />
      <Routes>{/* your routes here */}</Routes>
    </Router>
  );
}

export default App;
