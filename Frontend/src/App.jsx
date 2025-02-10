import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfRoles from "./components/ListOfRoles";
import CreateRole from "./components/CreateRole";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfRoles />} />
        <Route path="/create" element={<CreateRole />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
