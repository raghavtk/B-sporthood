import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
  Zap,
} from 'lucide-react';
import { featuredCourts } from '../data/courts';
import { CourtCard } from '../components/CourtCard';
import { Button, CourtArtwork, Eyebrow, SectionHeading } from '../components/ui';

const today = new Date().toISOString().split('T')[0];

export function Home() {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [date, setDate] = useState(today);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const query = new URLSearchParams();
    if (area) query.set('area', area);
    if (date) query.set('date', date);
    navigate(`/courts?${query.toString()}`);
  };

  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="page-shell hero__grid">
          <div className="hero__copy">
            <Eyebrow>Bengaluru plays here</Eyebrow>
            <h1>
              Your next great game,
              <br />
              <em>one court away.</em>
            </h1>
            <p>
              Thoughtfully selected badminton clubs, transparent slots, and a booking flow that
              gets out of the way of your game.
            </p>
            <form className="quick-search" onSubmit={submitSearch}>
              <label>
                <span>Where</span>
                <div>
                  <MapPin size={18} />
                  <select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Choose an area">
                    <option value="">All Bengaluru</option>
                    <option value="Indiranagar">Indiranagar</option>
                    <option value="Koramangala">Koramangala</option>
                    <option value="HSR Layout">HSR Layout</option>
                    <option value="Whitefield">Whitefield</option>
                  </select>
                </div>
              </label>
              <span className="quick-search__rule" aria-hidden="true" />
              <label>
                <span>When</span>
                <div>
                  <CalendarDays size={18} />
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    aria-label="Choose a date"
                  />
                </div>
              </label>
              <Button type="submit" aria-label="Search available courts">
                <Search size={19} />
                <span className="quick-search__button-label">Find a court</span>
              </Button>
            </form>
            <div className="hero__proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>AM</span>
                <span>RK</span>
                <span>JV</span>
              </div>
              <span>
                <strong>4.9 average rating</strong>
                Trusted by Bengaluru’s court regulars
              </span>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-frame">
              <CourtArtwork
                variant={2}
                name="A premium Bengaluru badminton court"
                image={featuredCourts[0]?.images?.[0]}
              />
              <span className="hero__image-index">COURT / 01</span>
              <div className="hero__floating-card">
                <span className="hero__pulse">
                  <i />
                </span>
                <span>
                  <strong>Open courts nearby</strong>
                  24 slots available today
                </span>
                <ChevronRight size={18} />
              </div>
            </div>
            <div className="hero__score">
              <Trophy size={19} />
              <span>
                <strong>12k+</strong>
                games booked
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="B-Sporthood benefits">
        <div className="page-shell">
          <span>
            <CircleCheck size={19} /> Live availability
          </span>
          <span>
            <ShieldCheck size={19} /> Verified venues
          </span>
          <span>
            <Zap size={19} /> Book in under a minute
          </span>
          <span>
            <UsersRound size={19} /> Built for your crew
          </span>
        </div>
      </section>

      <section className="page-section page-shell">
        <SectionHeading
          eyebrow="Club selection"
          title="Courts worth showing up for."
          description="From neighbourhood favourites to competition-grade arenas, every venue earns its place."
          action={
            <Link to="/courts" className="text-link">
              View all courts <ArrowRight size={17} />
            </Link>
          }
        />
        <div className="court-grid">
          {featuredCourts.slice(0, 3).map((court, index) => (
            <CourtCard court={court} index={index} key={court.id} />
          ))}
        </div>
      </section>

      <section className="page-section page-section--surface">
        <div className="page-shell steps-section">
          <div className="steps-section__intro">
            <Eyebrow>Effortlessly simple</Eyebrow>
            <h2>From “we should play” to “court booked.”</h2>
            <p>No calls. No confusing spreadsheets. Just the right venue, an open slot, and your crew.</p>
            <div className="steps-section__promise">
              <Sparkles size={19} />
              <span>
                <strong>Less arranging. More playing.</strong>
                The details stay organised in one place.
              </span>
            </div>
          </div>
          <ol className="steps-list">
            <li>
              <span>01</span>
              <div>
                <Search size={20} />
                <h3>Find your court</h3>
                <p>Search by neighbourhood, budget, and the facilities that matter to you.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <Clock3 size={20} />
                <h3>Pick an open slot</h3>
                <p>See real availability and a clear price before you commit.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <Check size={20} />
                <h3>You’re on court</h3>
                <p>Get an instant reference, with every booking detail ready when you need it.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="page-section page-shell">
        <div className="club-cta">
          <div className="club-cta__court" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="club-cta__copy">
            <Eyebrow>Your court is waiting</Eyebrow>
            <h2>Ready to make it a match?</h2>
            <p>Browse today’s availability across Bengaluru and lock in your next session.</p>
            <Link to="/courts" className="button">
              Explore courts <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

