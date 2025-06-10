import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profiles from './pages/Profiles';
import Browse from './pages/Browse';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import Watch from './pages/Watch';
import { ProfileProvider } from './contexts/ProfileContext';
import { MyListProvider } from './contexts/MyListContext';
import { LikedProvider } from './contexts/LikedContext';
import { NotificationProvider } from './contexts/NotificationContext';
import EmailConfirmation from './components/EmailConfirmation';
import PlanSelection from './components/PlanSelection';
import PlanTable from './components/PlanTable';
import PaymentForm from './components/PaymentForm';
import CreateProfile from './pages/CreateProfile';
import ProfileManager from './pages/ProfileManager';
import EditProfile from './pages/EditProfile';
import MyList from './pages/MyList.tsx';
import Details from './pages/Details';

function App() {
  return (
    <ProfileProvider>
      <MyListProvider>
        <LikedProvider>
          <NotificationProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-black text-white">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<EmailConfirmation />} />
                  <Route path="/signup/planform" element={<PlanSelection />} />
                  <Route path="/signup/plan-table" element={<PlanTable />} />
                  <Route path="/signup/payment" element={<PaymentForm />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/profiles/new" element={<CreateProfile />} />
                  <Route path="/profiles/manage" element={<ProfileManager />} />
                  <Route path="/profiles/edit/:id" element={<EditProfile />} />
                  <Route path="/watch/:id" element={<Watch />} />
                  <Route path="/details/:type/:id" element={<Details />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/tv-shows" element={<TVShows />} />
                  <Route path="/my-list" element={<MyList />} />
                </Routes>
              </div>
            </BrowserRouter>
          </NotificationProvider>
        </LikedProvider>
      </MyListProvider>
    </ProfileProvider>
  );
}

export default App;