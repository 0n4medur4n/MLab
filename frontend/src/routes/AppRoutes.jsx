import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Events from "../pages/Eventss/Events";
import Contact from "../pages/Contact/Contact";
import Declaration from "../pages/Declaration/Declaration";

const AppRoutes = ({ location }) => {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/eventos" element={<Events />} />
      <Route path="/declaracion" element={<Declaration />} />

      {/* Aquí irán las demás rutas cuando creemos las otras páginas */}
      {/* <Route path="/eventos" element={<Events />} />
      <Route path="/contacto" element={<Contact />} /> */}
    </Routes>
  );
};

export default AppRoutes;
