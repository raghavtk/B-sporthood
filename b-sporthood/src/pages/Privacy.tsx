import { Link } from 'react-router-dom';
import '../styles/support.css';

export default function Privacy() {
  return (
    <main className="support-page">
      <header className="support-hero">
        <p className="support-eyebrow">Privacy notice</p>
        <h1 className="support-title">Your demo data stays with you.</h1>
        <p className="support-lede">Last updated July 30, 2026. This prototype is designed to work in your browser without a live backend.</p>
      </header>
      <article className="support-layout">
        <div className="support-prose">
          <section><h2>What is stored</h2><p>When you use the demo, the app may save your theme preference, demo account, session, booking draft, and demo bookings in your browser’s local or session storage. This lets the flow continue after a refresh.</p></section>
          <section><h2>What is not collected</h2><p>The demo does not process real payments or ask for card numbers. It does not send your demo account or booking information to a production booking service.</p></section>
          <section><h2>How to remove it</h2><p>You can remove locally saved demo data at any time by clearing this site’s storage in your browser settings. Clearing site data signs you out and removes demo bookings created on that device.</p></section>
          <section><h2>Third-party services</h2><p>This interface does not use analytics or advertising services as part of the demonstration flow. Fonts and application assets are bundled with the app.</p></section>
          <section><h2>Questions</h2><p>This notice applies only to the demonstration. See the <Link to="/terms">terms of use</Link> for the scope of the prototype.</p></section>
        </div>
      </article>
    </main>
  );
}
