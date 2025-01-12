import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Slider from "./pages/Slider";
import List from "./pages/List";
import NotifSnackbar from "./components/Alert";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound.tsx";
import PrivateRouter from "./router/PrivateRouter.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/list" element={<List />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotifSnackbar />
    </>
  );
}

export default App;
