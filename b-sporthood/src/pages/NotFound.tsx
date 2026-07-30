import { Link } from 'react-router-dom';
import '../styles/support.css';

export default function NotFound() {
  return (
    <main className="support-page not-found-page">
      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="not-found-code" aria-hidden="true">404</p>
        <p className="support-eyebrow">Out of bounds</p>
        <h1 className="support-title" id="not-found-title">That court is not on today&apos;s draw.</h1>
        <p className="support-lede">The page may have moved, or the link may be incomplete. Let&apos;s get you back to a good starting point.</p>
        <nav className="not-found-actions" aria-label="Recovery options">
          <Link to="/">Return home</Link>
          <Link to="/courts">Browse courts</Link>
        </nav>
      </section>
    </main>
  );
}
