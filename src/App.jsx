import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import ArtistsList from "./pages/artists/ArtistsList"
import ArtistsForm from "./pages/artists/ArtistsForm"
import AlbumsForm from "./pages/albums/AlbumsForm"
import AlbumsList from "./pages/albums/AlbumsList"

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
        <Route path="/albums" element={<AlbumsList />} />
        <Route path="/albums/add" element={<AlbumsForm />} />
        <Route path="/albums/edit/:id" element={<AlbumsForm />} />
      </Routes>
    </Router>
  )
}

export default App