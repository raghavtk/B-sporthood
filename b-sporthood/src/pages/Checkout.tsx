import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  IndianRupee,
  LockKeyhole,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { getCourtById } from '../data/courts';
import { useApp } from '../context/AppContext';
import { Button, CourtArtwork, EmptyState } from '../components/ui';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${date}T12:00:00`),
  );

export function Checkout() {
  const { user, bookingDraft, createBooking } = useApp();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const court = bookingDraft ? getCourtById(bookingDraft.courtId) : undefined;

  if (!user) return <Navigate to="/login?returnTo=/checkout" replace />;
  if (!bookingDraft || !court) {
    return (
      <section className="page-section page-shell">
        <EmptyState
          icon={<CalendarDays size={26} />}
          title="Your booking bag is empty"
          description="Choose a court and an available time first. We’ll keep it here while you sign in."
          action={
            <Link to="/courts" className="button">
              Find a court
            </Link>
          }
        />
      </section>
    );
  }

  const completeBooking = async () => {
    if (processing) return;
    setProcessing(true);
    setError('');
    const result = createBooking(bookingDraft);
    if (!result.ok) {
      setProcessing(false);
      setError(result.error);
      return;
    }
    navigate(`/bookings/${result.booking.id}/confirmation`, { replace: true });
  };

  return (
    <section className="checkout-page page-shell">
      <Link to={`/courts/${court.slug}`} className="checkout-back">
        <ArrowLeft size={17} /> Edit court or time
      </Link>
      <div className="checkout-heading">
        <div>
          <span>Step 3 of 3</span>
          <h1>One last look.</h1>
          <p>Review the details below, then confirm your demo booking.</p>
        </div>
        <div className="checkout-progress" aria-label="Booking progress">
          {['Court', 'Sign in', 'Confirm'].map((step, index) => (
            <span className="checkout-progress__step" key={step}>
              <i>{index < 2 ? <Check size={13} /> : index + 1}</i>
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          <article className="checkout-card">
            <header>
              <span>Booking details</span>
              <span className="secure-label">
                <ShieldCheck size={16} /> Reserved for 10 minutes
              </span>
            </header>
            <div className="checkout-venue">
              <CourtArtwork variant={court.id.length} name={court.name} image={court.images[0]} />
              <div>
                <span>{court.area}</span>
                <h2>{court.name}</h2>
                <p>
                  <MapPin size={14} /> {court.address}
                </p>
              </div>
            </div>
            <div className="checkout-details-grid">
              <div>
                <CalendarDays size={19} />
                <span>
                  <small>Date</small>
                  <strong>{formatDate(bookingDraft.date)}</strong>
                </span>
              </div>
              <div>
                <Clock3 size={19} />
                <span>
                  <small>Time & duration</small>
                  <strong>
                    {bookingDraft.slot} · {bookingDraft.durationHours}{' '}
                    {bookingDraft.durationHours === 1 ? 'hour' : 'hours'}
                  </strong>
                </span>
              </div>
            </div>
          </article>

          <article className="checkout-card payment-method">
            <header>
              <span>Demo payment</span>
              <span className="secure-label">
                <LockKeyhole size={15} /> No real charge
              </span>
            </header>
            <div className="demo-payment">
              <span className="demo-payment__icon">
                <CreditCard size={22} />
              </span>
              <span>
                <strong>B.Sporthood demo pay</strong>
                <small>Preconfigured · •••• 4242</small>
              </span>
              <Check size={19} className="demo-payment__check" />
            </div>
            <p className="payment-disclosure">
              This portfolio demo never asks for or stores real payment information.
            </p>
          </article>
        </div>

        <aside className="order-summary">
          <span className="order-summary__eyebrow">Your total</span>
          <div className="order-summary__amount">
            <IndianRupee size={24} />
            <strong>{bookingDraft.total.toLocaleString('en-IN')}</strong>
          </div>
          <div className="price-lines">
            <span>
              Court × {bookingDraft.durationHours}h
              <strong>₹{bookingDraft.subtotal.toLocaleString('en-IN')}</strong>
            </span>
            <span>
              Booking service
              <strong>₹{bookingDraft.serviceFee.toLocaleString('en-IN')}</strong>
            </span>
            <span className="price-lines__total">
              Total due
              <strong>₹{bookingDraft.total.toLocaleString('en-IN')}</strong>
            </span>
          </div>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <Button onClick={completeBooking} loading={processing}>
            {processing ? 'Confirming your court' : 'Confirm demo booking'}
          </Button>
          <p>
            <LockKeyhole size={13} /> Safe, local, and only for demonstration
          </p>
        </aside>
      </div>
    </section>
  );
}
