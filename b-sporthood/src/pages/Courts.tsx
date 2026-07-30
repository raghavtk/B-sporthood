import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListFilter, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { courts, COURT_AMENITIES } from '../data/courts';
import { CourtCard } from '../components/CourtCard';
import { Button, Chip, EmptyState, Field, Select } from '../components/ui';

export function Courts() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState('');
  const [area, setArea] = useState(params.get('area') || 'All');
  const [amenity, setAmenity] = useState('All');
  const [maxPrice, setMaxPrice] = useState('1200');
  const [sort, setSort] = useState('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const areas = useMemo(() => ['All', ...Array.from(new Set(courts.map((court) => court.area)))], []);
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = courts.filter((court) => {
      const matchesQuery =
        !query ||
        court.name.toLowerCase().includes(query) ||
        court.area.toLowerCase().includes(query) ||
        court.amenities.some((item) => item.toLowerCase().includes(query));
      const matchesArea = area === 'All' || court.area === area;
      const matchesAmenity = amenity === 'All' || court.amenities.includes(amenity);
      const matchesPrice = court.pricePerHour <= Number(maxPrice);
      return matchesQuery && matchesArea && matchesAmenity && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.pricePerHour - b.pricePerHour;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'distance') return a.distanceKm - b.distanceKm;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating;
    });
  }, [amenity, area, maxPrice, search, sort]);

  const resetFilters = () => {
    setSearch('');
    setArea('All');
    setAmenity('All');
    setMaxPrice('1200');
    setSort('recommended');
  };

  return (
    <section className="courts-page page-shell">
      <header className="listing-header">
        <div>
          <span className="listing-header__kicker">
            <MapPin size={14} /> Bengaluru, Karnataka
          </span>
          <h1>Find your kind of court.</h1>
          <p>Handpicked spaces for after-work rallies, weekend leagues, and everything between.</p>
        </div>
        <div className="listing-header__count">
          <strong>{results.length.toString().padStart(2, '0')}</strong>
          <span>courts match</span>
        </div>
      </header>

      <div className="filter-bar">
        <Field
          label="Search courts"
          className="filter-bar__search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Court, area or amenity"
          leading={<Search size={18} />}
        />
        <Select label="Sort by" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="recommended">Recommended</option>
          <option value="rating">Highest rated</option>
          <option value="price-low">Lowest price</option>
          <option value="distance">Nearest first</option>
        </Select>
        <Button
          variant="secondary"
          className="filter-bar__mobile-trigger"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={17} /> Filters
        </Button>
      </div>

      <div className="listing-layout">
        <aside className={`filters ${filtersOpen ? 'filters--open' : ''}`}>
          <div className="filters__heading">
            <span>
              <ListFilter size={17} /> Refine results
            </span>
            <button onClick={resetFilters}>Reset all</button>
          </div>
          <div className="filter-group">
            <h2>Neighbourhood</h2>
            <div className="filter-chips">
              {areas.map((item) => (
                <Chip selected={area === item} onClick={() => setArea(item)} key={item}>
                  {item}
                </Chip>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h2>Max hourly price</h2>
            <div className="price-range__labels">
              <span>₹400</span>
              <strong>up to ₹{Number(maxPrice).toLocaleString('en-IN')}</strong>
            </div>
            <input
              className="price-range"
              type="range"
              min="400"
              max="1200"
              step="100"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              aria-label="Maximum hourly price"
            />
          </div>
          <div className="filter-group">
            <h2>Amenities</h2>
            <div className="filter-chips">
              <Chip selected={amenity === 'All'} onClick={() => setAmenity('All')}>
                Any
              </Chip>
              {COURT_AMENITIES.slice(0, 6).map((item) => (
                <Chip selected={amenity === item} onClick={() => setAmenity(item)} key={item}>
                  {item}
                </Chip>
              ))}
            </div>
          </div>
        </aside>

        <div className="listing-results">
          <div className="listing-results__summary">
            <span>
              Showing <strong>{results.length}</strong> of {courts.length} venues
            </span>
            {(area !== 'All' || amenity !== 'All') && (
              <div>
                {area !== 'All' ? (
                  <button onClick={() => setArea('All')}>
                    {area} <X size={13} />
                  </button>
                ) : null}
                {amenity !== 'All' ? (
                  <button onClick={() => setAmenity('All')}>
                    {amenity} <X size={13} />
                  </button>
                ) : null}
              </div>
            )}
          </div>
          {results.length ? (
            <div className="court-grid court-grid--listing">
              {results.map((court, index) => (
                <CourtCard court={court} index={index} key={court.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search size={25} />}
              title="No exact match yet"
              description="Try a nearby neighbourhood, raise your price range, or clear the amenity filter."
              action={
                <Button onClick={resetFilters} variant="secondary">
                  Clear all filters
                </Button>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}

