import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <Router basename="/Hueline-Enterprises-Website">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductsPage" element={<ProductsPage />} />
      </Routes>
    </ Router>
  );
}

export default App;