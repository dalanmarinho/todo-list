import { EditBarbecue } from "../pages/EditBarbecue";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit-barbecue/:id?" element={<EditBarbecue />} />
    </Routes>
  );
}