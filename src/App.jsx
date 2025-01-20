import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import ArtistsList from "./pages/artists/ArtistsList"
import ArtistsForm from "./pages/artists/ArtistsForm"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artists" element={<ArtistsList />} />
        <Route path="/artists/add" element={<ArtistsForm />} />
        <Route path="/artists/edit/:id" element={<ArtistsForm />} />
      </Routes>
    </Router>
  )
}

export default App