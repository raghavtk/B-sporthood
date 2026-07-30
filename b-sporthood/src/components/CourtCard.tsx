import { Link } from 'react-router-dom';
import { ArrowUpRight, IndianRupee, MapPin, Star } from 'lucide-react';
import type { Court } from '../types';
import { Badge, CourtArtwork } from './ui';

export function CourtCard({ court, index = 0 }: { court: Court; index?: number }) {
  return (
    <article className="court-card">
      <Link to={`/courts/${court.slug}`} className="court-card__image" aria-label={`View ${court.name}`}>
        <CourtArtwork
          variant={index}
          name={court.name}
          image={court.images?.[0]}
        />
        {court.featured ? <Badge tone="mint">Club pick</Badge> : null}
        <span className="court-card__open" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="court-card__body">
        <div className="court-card__meta">
          <span>
            <MapPin size={14} /> {court.area}
          </span>
          <span>
            <Star size={14} fill="currentColor" /> {court.rating.toFixed(1)}
          </span>
        </div>
        <Link to={`/courts/${court.slug}`} className="court-card__title">
          <h3>{court.name}</h3>
        </Link>
        <div className="court-card__footer">
          <div className="court-card__amenities">
            {court.amenities.slice(0, 2).map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>
          <div className="court-card__price">
            <strong>
              <IndianRupee size={14} />
              {court.pricePerHour.toLocaleString('en-IN')}
            </strong>
            <span>/ hour</span>
          </div>
        </div>
      </div>
    </article>
  );
}

