import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  IndianRupee,
  Info,
  MapPin,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { getCourtBySlug } from '../data/courts';
import { getAvailableSlots, getUpcomingDates, TIME_SLOTS } from '../data/availability';
import { useApp } from '../context/AppContext';
import { Button, CourtArtwork, EmptyState, Eyebrow } from '../components/ui';

const displayDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-IN', options).format(new Date(`${date}T12:00:00`));

export function CourtDetail() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { user, saveDraft } = useApp();
  const court = getCourtBySlug(slug);
  const dates = useMemo(() => getUpcomingDates(7), []);
  const [date, setDate] = useState(dates[0]);
  const [slot, setSlot] = useState('');
  const [duration, setDuration] = useState(1);

  if (!court) {
    return (
      <section className="page-section page-shell">
        <EmptyState
          icon={<MapPin size={26} />}
          title="That court has moved off the map"
          description="The venue link may be old, but there are plenty of great places to play nearby."
          action={
            <Link to="/courts" className="button">
              Browse all courts
            </Link>
          }
        />
      </section>
    );
  }

  const availableSlots = getAvailableSlots(court, date);
  const subtotal = court.pricePerHour * duration;
  const serviceFee = 49;
  const total = subtotal + serviceFee;

  const continueBooking = () => {
    if (!slot) return;
    saveDraft({
      courtId: court.id,
      date,
      slot,
      durationHours: duration,
      subtotal,
      serviceFee,
      total,
      returnPath: `/courts/${court.slug}`,
    });
    navigate(user ? '/checkout' : '/login?returnTo=/checkout');
  };

  return (
    <article className="court-detail">
      <div className="page-shell court-detail__back">
        <Link to="/courts">
          <ArrowLeft size={17} /> Back to courts
        </Link>
      </div>
      <div className="page-shell court-gallery">
        {[0, 1, 2].map((index) => (
          <CourtArtwork
            key={index}
            variant={index + court.id.length}
            name={`${court.name} view ${index + 1}`}
            image={court.images[index]}
          />
        ))}
        <span className="court-gallery__count">1 / {Math.max(court.images.length, 3)}</span>
      </div>

      <div className="page-shell court-detail__layout">
        <div className="court-detail__content">
          <header className="court-title">
            <div>
              <Eyebrow>{court.area}</Eyebrow>
              <h1>{court.name}</h1>
              <p>
                <MapPin size={16} /> {court.address} · {court.distanceKm} km away
              </p>
            </div>
            <div className="court-rating">
              <Star size={19} fill="currentColor" />
              <strong>{court.rating.toFixed(1)}</strong>
              <span>{court.reviewCount} reviews</span>
            </div>
          </header>

          <div className="court-trust">
            <span>
              <BadgeCheck size={19} /> Verified venue
            </span>
            <span>
              <ShieldCheck size={19} /> Quality checked
            </span>
            <span>
              <Clock3 size={19} /> Instant booking
            </span>
          </div>

          <section className="detail-section">
            <h2>Why you’ll love playing here</h2>
            <p>{court.description}</p>
          </section>

          <section className="detail-section">
            <h2>Everything on court</h2>
            <div className="amenity-grid">
              {court.amenities.map((amenity) => (
                <span key={amenity}>
                  <Check size={17} /> {amenity}
                </span>
              ))}
              {court.equipment.map((item) => (
                <span key={item}>
                  <Check size={17} /> {item}
                </span>
              ))}
            </div>
          </section>

          <section className="detail-section booking-selector">
            <div className="detail-section__heading">
              <div>
                <span>Choose your session</span>
                <h2>When are we playing?</h2>
              </div>
              <span className="availability-key">
                <i /> Available
              </span>
            </div>
            <div className="date-strip" aria-label="Choose a date">
              {dates.map((item) => (
                <button
                  key={item}
                  className={date === item ? 'date-card date-card--selected' : 'date-card'}
                  onClick={() => {
                    setDate(item);
                    setSlot('');
                  }}
                  aria-pressed={date === item}
                >
                  <span>{displayDate(item, { weekday: 'short' })}</span>
                  <strong>{displayDate(item, { day: '2-digit' })}</strong>
                  <span>{displayDate(item, { month: 'short' })}</span>
                </button>
              ))}
            </div>
            <div className="slot-heading">
              <h3>
                <Clock3 size={18} /> Open times
              </h3>
              <span>{availableSlots.length} slots available</span>
            </div>
            <div className="slot-grid">
              {TIME_SLOTS.map((time) => {
                const available = availableSlots.includes(time);
                return (
                  <button
                    key={time}
                    disabled={!available}
                    className={slot === time ? 'slot slot--selected' : 'slot'}
                    onClick={() => setSlot(time)}
                    aria-pressed={slot === time}
                  >
                    {time}
                    {slot === time ? <Check size={14} /> : null}
                  </button>
                );
              })}
            </div>
            <label className="duration-control">
              <span>
                <strong>Session length</strong>
                Longer rallies? Add another hour.
              </span>
              <select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
              </select>
            </label>
          </section>

          <section className="detail-section rules-box">
            <Info size={20} />
            <div>
              <h2>Good to know</h2>
              <ul>
                {court.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="booking-summary">
          <div className="booking-summary__price">
            <span>Starting at</span>
            <strong>
              <IndianRupee size={20} /> {court.pricePerHour.toLocaleString('en-IN')}
            </strong>
            <span>per hour</span>
          </div>
          <div className="booking-summary__selection">
            <div>
              <CalendarDays size={18} />
              <span>
                <small>Date</small>
                <strong>{displayDate(date, { weekday: 'short', day: 'numeric', month: 'short' })}</strong>
              </span>
            </div>
            <div>
              <Clock3 size={18} />
              <span>
                <small>Time</small>
                <strong>{slot || 'Choose a slot'}</strong>
              </span>
            </div>
          </div>
          <div className="price-lines">
            <span>
              Court × {duration} {duration === 1 ? 'hour' : 'hours'} <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </span>
            <span>
              Service fee <strong>₹{serviceFee}</strong>
            </span>
            <span className="price-lines__total">
              Total <strong>₹{total.toLocaleString('en-IN')}</strong>
            </span>
          </div>
          <Button onClick={continueBooking} disabled={!slot} trailingIcon>
            {slot ? 'Continue to book' : 'Select a time'}
          </Button>
          <p>No charge yet. You’ll review everything next.</p>
        </aside>
      </div>
    </article>
  );
}
