import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  CalendarDays,
  CalendarX,
  CheckCircle2,
  Clock3,
  MapPin,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import type { Booking } from '../types';
import { useApp } from '../context/AppContext';
import { Badge, Button, CourtArtwork, Dialog, EmptyState, Eyebrow } from '../components/ui';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${date}T12:00:00`),
  );

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: (booking: Booking) => void }) {
  const upcoming = booking.status === 'upcoming';
  return (
    <article className={`booking-card ${booking.status === 'cancelled' ? 'booking-card--cancelled' : ''}`}>
      <CourtArtwork
        variant={booking.court.id.length}
        name={booking.court.name}
        image={booking.court.images[0]}
        className="booking-card__image"
      />
      <div className="booking-card__body">
        <div className="booking-card__status">
          <Badge tone={upcoming ? 'mint' : 'neutral'}>
            {upcoming ? <CheckCircle2 size={13} /> : booking.status === 'cancelled' ? <XCircle size={13} /> : <Clock3 size={13} />}
            {booking.status === 'cancelled' ? 'Cancelled' : upcoming ? 'Confirmed' : 'Played'}
          </Badge>
          <span>{booking.reference}</span>
        </div>
        <div>
          <span className="booking-card__area">{booking.court.area}</span>
          <h3>{booking.court.name}</h3>
          <p>
            <MapPin size={14} /> {booking.court.address}
          </p>
        </div>
        <div className="booking-card__schedule">
          <span>
            <CalendarDays size={17} />
            <strong>{formatDate(booking.date)}</strong>
          </span>
          <span>
            <Clock3 size={17} />
            <strong>
              {booking.slot} · {booking.durationHours}h
            </strong>
          </span>
        </div>
        <div className="booking-card__footer">
          <strong>₹{booking.total.toLocaleString('en-IN')}</strong>
          <div>
            {upcoming ? (
              <Button variant="quiet" size="small" onClick={() => onCancel(booking)}>
                Cancel
              </Button>
            ) : null}
            <Link to={`/courts/${booking.court.slug}`} className="button button--secondary button--small">
              <RotateCcw size={15} /> Book again
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Bookings() {
  const { user, bookings, cancelBooking } = useApp();
  const [selected, setSelected] = useState<Booking | null>(null);
  const [toast, setToast] = useState('');
  const upcoming = bookings.filter((booking) => booking.status === 'upcoming');
  const history = bookings.filter((booking) => booking.status !== 'upcoming');

  if (!user) return <Navigate to="/login?returnTo=/bookings" replace />;

  const confirmCancel = () => {
    if (!selected) return;
    const result = cancelBooking(selected.id);
    if (result.ok) setToast(`${selected.court.name} has been cancelled.`);
    else setToast(result.error);
    setSelected(null);
    window.setTimeout(() => setToast(''), 4500);
  };

  return (
    <section className="bookings-page page-shell">
      <header className="bookings-heading">
        <div>
          <Eyebrow>Your court diary</Eyebrow>
          <h1>My bookings</h1>
          <p>Everything you’ve booked, played, or want to return to.</p>
        </div>
        <Link to="/courts" className="button">
          Find another court
        </Link>
      </header>

      {!bookings.length ? (
        <EmptyState
          icon={<CalendarX size={26} />}
          title="Your court diary is wide open"
          description="Once you book your first game, every detail will be ready here."
          action={
            <Link to="/courts" className="button">
              Explore courts
            </Link>
          }
        />
      ) : (
        <div className="bookings-sections">
          <section>
            <div className="bookings-section__heading">
              <h2>Coming up</h2>
              <span>{upcoming.length} {upcoming.length === 1 ? 'booking' : 'bookings'}</span>
            </div>
            {upcoming.length ? (
              <div className="booking-list">
                {upcoming.map((booking) => (
                  <BookingCard booking={booking} onCancel={setSelected} key={booking.id} />
                ))}
              </div>
            ) : (
              <div className="bookings-inline-empty">
                <CalendarDays size={20} />
                <span>
                  <strong>No upcoming games</strong>
                  Your next great rally is just a booking away.
                </span>
                <Link to="/courts">Browse courts</Link>
              </div>
            )}
          </section>
          {history.length ? (
            <section>
              <div className="bookings-section__heading">
                <h2>Past & cancelled</h2>
                <span>{history.length} saved</span>
              </div>
              <div className="booking-list">
                {history.map((booking) => (
                  <BookingCard booking={booking} onCancel={setSelected} key={booking.id} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Cancel this court?"
        description={
          selected
            ? `${selected.court.name} on ${formatDate(selected.date)} at ${selected.slot}. This cannot be undone.`
            : undefined
        }
      >
        <div className="dialog__actions">
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Keep booking
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Yes, cancel
          </Button>
        </div>
      </Dialog>
      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} /> {toast}
        </div>
      ) : null}
    </section>
  );
}

