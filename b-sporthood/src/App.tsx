import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { Courts } from './pages/Courts';
import { CourtDetail } from './pages/CourtDetail';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { Bookings } from './pages/Bookings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import './styles/pages.css';
import './styles/support.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courts" element={<Courts />} />
      <Route path="/courts/:slug" element={<CourtDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/bookings/:id/confirmation" element={<Confirmation />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const { user, themePreference, setThemePreference, logout } = useApp();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  return (
    <AppShell
      theme={themePreference}
      onThemeChange={setThemePreference}
      user={user ?? null}
      onLogout={logout}
    >
      <AppRoutes />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
