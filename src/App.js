

import Showtimes from './pages/Showtimes';
import { UserProvider } from './UserContext';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ShowtimesAdmin from './pages/ShowtimesAdmin';
import EditMovies from './pages/EditMovies';
import AddMovie from './pages/AddMovie';
import ManageUsers from './pages/ManageUsers';
import PurchaseHistory from './pages/purchaseHistory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <UserProvider>
     <Router>
     <Routes>
         <Route path="/" element={<Showtimes />} />
         <Route path="/admin" element={<ShowtimesAdmin />} />
         <Route path='/editMovies' element={<EditMovies />} />
         <Route path='/addMovie' element={<AddMovie />} />
         <Route path='/manageUsers' element={<ManageUsers />} />
         <Route path='/purchaseHistory' element={<PurchaseHistory />} />
         <Route path="/register" element={<Register />} />
         <Route path="*" element={<NotFound />} /> {/* Create a NotFound component or redirect */}
     </Routes>
  </Router>
  </UserProvider>
  );
}

export default App;
