import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./Dashboard"
import ArtistsList from "./pages/artists/ArtistsList"
import ArtistsForm from "./pages/artists/ArtistsForm"
import AlbumsList from "./pages/albums/AlbumsList"
import AlbumsForm from "./pages/albums/AlbumsForm"
import GenresList from "./pages/genres/GenresList"
import GenresForm from "./pages/genres/GenresForm"
import MediaTypesList from "./pages/mediatypes/MediaTypesList"
import MediaTypesForm from "./pages/mediatypes/MediaTypesForm"
import TracksList from "./pages/tracks/TracksList"
import TracksForm from "./pages/tracks/TracksForm"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import MainLayout from "./layouts/MainLayout"
import LayoutProvider from "./providers/LayoutProvider"
import ProtectedRoutes from "./components/ProtectedRoutes"

function App() {
  return (
    <Router>
      <LayoutProvider>
        <Routes>

          {/* Route publique */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/artists" element={<ArtistsList />} />
              <Route path="/artists/add" element={<ArtistsForm />} />
              <Route path="/artists/edit/:id" element={<ArtistsForm />} />

              <Route path="/albums" element={<AlbumsList />} />
              <Route path="/albums/add" element={<AlbumsForm />} />
              <Route path="/albums/edit/:id" element={<AlbumsForm />} />

              <Route path="/tracks" element={<TracksList />} />
              <Route path="/tracks/add" element={<TracksForm />} />
              <Route path="/tracks/edit/:id" element={<TracksForm />} />

              <Route path="/genres" element={<GenresList />} />
              <Route path="/genres/add" element={<GenresForm />} />
              <Route path="/genres/edit/:id" element={<GenresForm />} />

              <Route path="/mediatypes" element={<MediaTypesList />} />
              <Route path="/mediatypes/add" element={<MediaTypesForm />} />
              <Route path="/mediatypes/edit/:id" element={<MediaTypesForm />} />
            </Route>
          </Route>
        </Routes>
      </LayoutProvider>
    </Router>
  )
}

export default App