import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import '../styles/support.css';

export default function About() {
  return (
    <main className="support-page story-page">
      <header className="story-hero">
        <div className="story-hero__copy">
          <p className="support-eyebrow">Our story</p>
          <h1 className="support-title">A student idea, reimagined for every rally.</h1>
          <p className="support-lede">
            B-Sporthood began in 2020 with a simple question: why should organising a
            badminton game feel harder than playing one?
          </p>
          <Link className="story-link" to="/courts">
            Find your next court <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="story-hero__visual" aria-hidden="true">
          <img src="/images/courts/court-rooftop.png" alt="" />
          <span className="story-hero__wash" />
          <span className="story-hero__label">Bengaluru · Est. 2020</span>
          <div className="story-hero__note">
            <Sparkles size={19} />
            <span>
              <strong>Built for the love of the game</strong>
              From a college project to a complete booking experience.
            </span>
          </div>
        </div>
      </header>

      <section className="story-origin" aria-labelledby="story-origin-title">
        <div>
          <p className="support-eyebrow">Where it started</p>
          <h2 id="story-origin-title">The best games often begin in a group chat.</h2>
        </div>
        <div className="story-origin__copy">
          <p>
            The original B-Sporthood was created during undergrad to solve a familiar
            Bengaluru problem: finding a nearby court, checking whether it was free, and
            getting everyone to agree on a time.
          </p>
          <p>
            Years later, that early idea became the foundation for a more thoughtful
            experience—one that makes discovery feel inspiring, availability feel clear,
            and booking feel almost invisible.
          </p>
        </div>
      </section>

      <section className="story-values" aria-labelledby="story-values-title">
        <div className="story-section-heading">
          <p className="support-eyebrow">What guides us</p>
          <h2 id="story-values-title">Designed around the player.</h2>
          <p>Every detail has one job: help you spend less energy planning and more of it playing.</p>
        </div>
        <div className="story-values__grid">
          <article className="story-value">
            <span className="story-value__icon"><MapPin size={22} /></span>
            <span className="story-value__number">01</span>
            <h3>Local by design</h3>
            <p>Neighbourhood context, Bengaluru-first locations, and the details that matter before you travel.</p>
          </article>
          <article className="story-value">
            <span className="story-value__icon"><CalendarCheck size={22} /></span>
            <span className="story-value__number">02</span>
            <h3>Effortless by default</h3>
            <p>A calm path from browsing to booking, with transparent slots and no unnecessary detours.</p>
          </article>
          <article className="story-value">
            <span className="story-value__icon"><ShieldCheck size={22} /></span>
            <span className="story-value__number">03</span>
            <h3>Honest by nature</h3>
            <p>Clear prices, clear expectations, and an upfront distinction between this demo and a live service.</p>
          </article>
        </div>
      </section>

      <section className="story-timeline" aria-labelledby="story-timeline-title">
        <div className="story-section-heading story-section-heading--compact">
          <p className="support-eyebrow">Then to now</p>
          <h2 id="story-timeline-title">The idea kept moving.</h2>
        </div>
        <ol className="story-timeline__list">
          <li>
            <span className="story-timeline__year">2020</span>
            <div>
              <h3>The first serve</h3>
              <p>A sophomore-year project turns a recurring court-booking frustration into an early product idea.</p>
            </div>
          </li>
          <li>
            <span className="story-timeline__year">Today</span>
            <div>
              <h3>A complete rethink</h3>
              <p>The experience is rebuilt around modern discovery, accessible interactions, and a seamless end-to-end demo journey.</p>
            </div>
          </li>
          <li>
            <span className="story-timeline__year">Next</span>
            <div>
              <h3>Wherever the game goes</h3>
              <p>The vision stays the same: make it easier for more people to find a court, gather their crew, and keep playing.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="story-demo" aria-labelledby="about-demo">
        <div className="story-demo__icon" aria-hidden="true">
          <HeartHandshake size={28} />
        </div>
        <div>
          <p className="support-eyebrow">A considered demo</p>
          <h2 id="about-demo">Everything you need to explore the idea.</h2>
          <p>
            This redesigned B-Sporthood is a portfolio demonstration. Courts and
            availability are realistic sample data, while sign-in, booking, and payment
            are safely simulated on your device. No real card details are requested or stored.
          </p>
        </div>
        <Link className="story-demo__action" to="/courts">
          Explore the experience <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
