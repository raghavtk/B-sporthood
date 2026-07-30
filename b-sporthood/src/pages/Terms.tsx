import { Link } from 'react-router-dom';
import '../styles/support.css';

export default function Terms() {
  return (
    <main className="support-page">
      <header className="support-hero">
        <p className="support-eyebrow">Terms of use</p>
        <h1 className="support-title">Play fair, book clearly.</h1>
        <p className="support-lede">Last updated July 30, 2026. These terms describe this B-Sporthood demonstration and its local booking experience.</p>
      </header>
      <article className="support-layout">
        <div className="support-prose">
          <section><h2>Demonstration service</h2><p>B-Sporthood is a portfolio prototype, not a live marketplace. Court listings, availability, accounts, payments, and confirmations are illustrative. A completed demo booking does not reserve a real court or create a contract with a venue.</p></section>
          <section><h2>Using the experience</h2><p>You may browse and test the booking flow for personal evaluation. Please do not attempt to disrupt the service, impersonate another person, or use automated methods that affect its normal operation.</p></section>
          <section><h2>Bookings and cancellations</h2><p>Prices are displayed in Indian rupees for demonstration. Payment is preconfigured and no real card information is collected. Cancelling a booking changes only the data saved in your browser.</p></section>
          <section><h2>Content and venue information</h2><p>Venue names, amenities, images, ratings, and schedules are presented for interface demonstration. Confirm any real-world details directly with a venue before making travel or booking decisions.</p></section>
          <section><h2>Questions</h2><p>For a helpful next step, return to <Link to="/courts">court discovery</Link> or read our <Link to="/privacy">privacy notice</Link>.</p></section>
        </div>
      </article>
    </main>
  );
}
