import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Slider from "./pages/Slider";
import List from "./pages/List";
import NotifSnackbar from "./components/Alert";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./router/PrivateRouter";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
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
