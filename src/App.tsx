import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Slider from "./pages/Slider";
import List from "./pages/List";
import NotifSnackbar from "./components/Alerts";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <NotifSnackbar />
    </>
  );
}

export default App;
