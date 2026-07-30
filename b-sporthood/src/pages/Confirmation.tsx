import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  MapPin,
  PartyPopper,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CourtArtwork, EmptyState } from '../components/ui';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${date}T12:00:00`),
  );

export function Confirmation() {
  const { id = '' } = useParams();
  const { user, getBooking } = useApp();
  const booking = getBooking(id);

  if (!user) return <Navigate to={`/login?returnTo=${encodeURIComponent(`/bookings/${id}/confirmation`)}`} replace />;
  if (!booking) {
    return (
      <section className="page-section page-shell">
        <EmptyState
          icon={<CalendarDays size={25} />}
          title="We can’t find that booking"
          description="It may belong to another account, or the confirmation link may be incomplete."
          action={
            <Link to="/bookings" className="button">
              View my bookings
            </Link>
          }
        />
      </section>
    );
  }

  const copyReference = () => navigator.clipboard?.writeText(booking.reference);

  return (
    <section className="confirmation-page">
      <div className="confirmation-burst" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="page-shell confirmation-layout">
        <div className="confirmation-copy">
          <span className="confirmation-check">
            <Check size={28} />
          </span>
          <span className="confirmation-kicker">
            <PartyPopper size={16} /> Court confirmed
          </span>
          <h1>Game on, {user.name.split(' ')[0]}.</h1>
          <p>
            Your court is locked in. We’ve saved every detail below so all that’s left is to bring your best rally.
          </p>
          <div className="confirmation-reference">
            <span>
              <small>Booking reference</small>
              <strong>{booking.reference}</strong>
            </span>
            <button onClick={copyReference} aria-label="Copy booking reference">
              <Copy size={17} /> Copy
            </button>
          </div>
          <div className="confirmation-actions">
            <Link to="/bookings" className="button">
              View my bookings <ArrowRight size={17} />
            </Link>
            <Link to="/courts" className="button button--secondary">
              Book another
            </Link>
          </div>
        </div>

        <article className="confirmation-ticket">
          <div className="confirmation-ticket__image">
            <CourtArtwork variant={booking.court.id.length} name={booking.court.name} image={booking.court.images[0]} />
            <span>
              <CheckCircle2 size={16} /> Confirmed
            </span>
          </div>
          <div className="confirmation-ticket__body">
            <span>{booking.court.area}</span>
            <h2>{booking.court.name}</h2>
            <p>
              <MapPin size={15} /> {booking.court.address}
            </p>
            <div className="ticket-rule" />
            <div className="ticket-details">
              <div>
                <CalendarDays size={19} />
                <span>
                  <small>Date</small>
                  <strong>{formatDate(booking.date)}</strong>
                </span>
              </div>
              <div>
                <Clock3 size={19} />
                <span>
                  <small>Your session</small>
                  <strong>
                    {booking.slot} · {booking.durationHours} {booking.durationHours === 1 ? 'hour' : 'hours'}
                  </strong>
                </span>
              </div>
            </div>
            <div className="ticket-total">
              <span>Total paid</span>
              <strong>₹{booking.total.toLocaleString('en-IN')}</strong>
            </div>
          </div>
          <div className="ticket-stub" aria-hidden="true">
            <i />
            <span>B • SPORT • HOOD</span>
            <i />
          </div>
        </article>
      </div>
    </section>
  );
}
