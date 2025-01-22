import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import ArtistsList from "./pages/artists/ArtistsList"
import ArtistsForm from "./pages/artists/ArtistsForm"
import AlbumsForm from "./pages/albums/AlbumsForm"
import AlbumsList from "./pages/albums/AlbumsList"
import GenresList from "./pages/genres/GenresList"
import GenresForm from "./pages/genres/GenresForm"
import MediaTypesList from "./pages/mediatypes/MediaTypesList"
import MediaTypesForm from "./pages/mediatypes/MediaTypesForm"

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
        <Route path="/genres" element={<GenresList />} />
        <Route path="/genres/add" element={<GenresForm />} />
        <Route path="/genres/edit/:id" element={<GenresForm />} />
        <Route path="/mediatypes" element={<MediaTypesList />} />
        <Route path="/mediatypes/add" element={<MediaTypesForm />} />
        <Route path="/mediatypes/edit/:id" element={<MediaTypesForm />} />
      </Routes>
    </Router>
  )
}

export default App