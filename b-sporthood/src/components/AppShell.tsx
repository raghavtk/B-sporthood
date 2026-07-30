import { type ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from 'lucide-react';
import type { DemoUser, ThemePreference } from '../types';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={`brand ${compact ? 'brand--compact' : ''}`} aria-label="B-Sporthood home">
      <span className="brand__mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand__name">
        <b>B.</b>
        <span>Sporthood</span>
      </span>
    </Link>
  );
}

const navItems = [
  { label: 'Discover', to: '/courts' },
  { label: 'My bookings', to: '/bookings' },
  { label: 'Our story', to: '/about' },
];

export function AppShell({
  children,
  theme,
  onThemeChange,
  user,
  onLogout,
}: {
  children: ReactNode;
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
  user: DemoUser | null;
  onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, []);

  const nextTheme: ThemePreference =
    theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
  const themeLabel =
    theme === 'system' ? 'Use light theme' : theme === 'light' ? 'Use dark theme' : 'Use system theme';

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-button" onClick={() => onThemeChange(nextTheme)} aria-label={themeLabel}>
              {theme === 'dark' ? <Moon size={19} /> : <Sun size={19} />}
            </button>
            {user ? (
              <div className="account-menu">
                <button
                  className="account-trigger"
                  onClick={() => setAccountOpen((open) => !open)}
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                >
                  <span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span>
                  <span className="account-trigger__label">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={16} />
                </button>
                {accountOpen ? (
                  <div className="account-popover" role="menu">
                    <div className="account-popover__identity">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <Link to="/bookings" role="menuitem">
                      <CalendarDays size={17} /> My bookings
                    </Link>
                    <button onClick={onLogout} role="menuitem">
                      <LogOut size={17} /> Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link className="button button--secondary button--small header-signin" to="/login">
                Sign in
              </Link>
            )}
            <button
              className="icon-button mobile-menu-trigger"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <>
            <button className="menu-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <div className="mobile-nav__top">
                <span>Explore B.Sporthood</span>
                <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
                  <X size={21} />
                </button>
              </div>
              {navItems.map((item, index) => (
                <NavLink key={item.to} to={item.to}>
                  <span>0{index + 1}</span>
                  {item.label}
                </NavLink>
              ))}
              {!user ? (
                <Link className="button mobile-nav__signin" to="/login">
                  <UserRound size={18} /> Sign in to your club
                </Link>
              ) : null}
            </nav>
          </>
        ) : null}
      </header>

      <div id="main-content">{children}</div>

      <footer className="site-footer">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Brand />
            <p>Find your court. Bring your game. Bengaluru’s best badminton spaces, in one considered place.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <span>Play</span>
              <Link to="/courts">Browse courts</Link>
              <Link to="/bookings">My bookings</Link>
            </div>
            <div>
              <span>Company</span>
              <Link to="/about">Our story</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} B.Sporthood</span>
          <span>Made for Bengaluru’s court community.</span>
        </div>
      </footer>
    </div>
  );
}
