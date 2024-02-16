import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "@/components/wrappers/LayoutWrapper";
import Landing from "@/pages/Landing/Landing";
import Event from "@/pages/Event/Event";

const App = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/event/:id" element={<Event />} /> */}
        {/*   <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/redirect" element={<Redirecting />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
