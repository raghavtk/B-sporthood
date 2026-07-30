import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { courts } from './data/courts';
import { STORAGE_KEYS } from './services/storage';

const demoSession = () => ({
  userId: 'user-demo-player',
  createdAt: '2026-07-30T09:00:00.000Z',
  expiresAt: '2099-07-30T09:00:00.000Z',
});

const renderAt = (path: string) => {
  window.history.replaceState({}, '', path);
  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.scrollTo = vi.fn();
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
});

describe('app journeys', () => {
  it('navigates through the primary navigation and persists a selected theme', async () => {
    const user = userEvent.setup();
    const view = renderAt('/');

    await user.click(view.getByRole('link', { name: 'Discover' }));
    expect(await view.findByRole('heading', { name: 'Find your kind of court.' })).toBeInTheDocument();
    expect(view.getByRole('link', { name: 'Discover' })).toHaveClass('nav-link--active');

    await user.click(view.getByRole('button', { name: 'Use light theme' }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEYS.theme) ?? 'null')).toBe('light');
  });

  it('filters courts and offers a clear recovery for zero results', async () => {
    const user = userEvent.setup();
    const view = renderAt('/courts');

    const search = view.getByRole('textbox', { name: 'Search courts' });
    await user.type(search, 'Ace Arena');
    expect(view.getByRole('link', { name: 'View Ace Arena' })).toBeInTheDocument();
    expect(view.queryByRole('link', { name: 'View Smash House' })).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'no such court');
    expect(await view.findByRole('heading', { name: 'No exact match yet' })).toBeInTheDocument();
    await user.click(view.getByRole('button', { name: 'Clear all filters' }));
    expect(view.queryByRole('heading', { name: 'No exact match yet' })).not.toBeInTheDocument();
  });

  it('recovers safely when a court slug is unknown', () => {
    const view = renderAt('/courts/not-a-real-venue');
    expect(view.getByRole('heading', { name: 'That court has moved off the map' })).toBeInTheDocument();
    expect(view.getByRole('link', { name: 'Browse all courts' })).toHaveAttribute('href', '/courts');
  });

  it('keeps an anonymous player’s selected session through sign-in and returns to checkout', async () => {
    const user = userEvent.setup();
    const view = renderAt(`/courts/${courts[0].slug}`);

    const availableSlot = view.getAllByRole('button').find((button) => /^\d{2}:\d{2}$/.test(button.textContent ?? '') && !button.hasAttribute('disabled'));
    expect(availableSlot).toBeDefined();
    await user.click(availableSlot!);
    await user.click(view.getByRole('button', { name: 'Continue to book' }));

    expect(await view.findByRole('heading', { name: 'Your court is waiting.' })).toBeInTheDocument();
    await user.click(view.getByRole('button', { name: /Use the demo account/i }));
    await user.click(view.getByRole('button', { name: 'Sign in' }));
    expect(await view.findByRole('heading', { name: 'One last look.' })).toBeInTheDocument();
    expect(view.getByText(courts[0].name)).toBeInTheDocument();
  });

  it('shows a safe checkout recovery when a signed-in player has no draft', () => {
    window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(demoSession()));
    const view = renderAt('/checkout');
    expect(view.getByRole('heading', { name: 'Your booking bag is empty' })).toBeInTheDocument();
    expect(view.getByRole('link', { name: 'Find a court' })).toHaveAttribute('href', '/courts');
  });

  it('requires confirmation before cancelling a saved booking and updates the diary', async () => {
    const user = userEvent.setup();
    const court = courts[0];
    window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(demoSession()));
    window.localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify([{
      id: 'booking-cancel-test', reference: 'BSP-CANCEL', userId: 'user-demo-player',
      court: { id: court.id, slug: court.slug, name: court.name, area: court.area, address: court.address, images: court.images },
      date: '2099-08-01', slot: '18:00', durationHours: 1, subtotal: court.pricePerHour, serviceFee: 49,
      total: court.pricePerHour + 49, status: 'upcoming', createdAt: '2026-07-30T09:00:00.000Z',
    }]));
    const view = renderAt('/bookings');

    await user.click(view.getByRole('button', { name: 'Cancel' }));
    expect(view.getByRole('dialog', { name: 'Cancel this court?' })).toBeInTheDocument();
    await user.click(view.getByRole('button', { name: 'Yes, cancel' }));
    expect(await view.findByText('Cancelled')).toBeInTheDocument();
    expect(view.getByRole('status')).toHaveTextContent('has been cancelled');
  });
});
