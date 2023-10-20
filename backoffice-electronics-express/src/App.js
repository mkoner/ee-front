import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import './App.css';
import AddProduct from "./components/addProduct/addProduct";
import AdminsPage from "./pages/admins/admins";
import CategoriesPage from "./pages/categories/categories";
import CreateAdmin from "./pages/createAdmin/createAdmin";
import CreateCategory from "./pages/createCategory/createCategory";
import CreateOrder from "./pages/createOrder/createOrder";
import CreateProduct from "./pages/createProduct/createProduct";
import Home from './pages/home/home';
import Login from "./pages/login/login";
import OrderPage from "./pages/orderPage/orderPage";
import OrdersPage from "./pages/orders/orders";
import ProductsPage from "./pages/products/products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admins" element={<AdminsPage/>} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderPage />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
