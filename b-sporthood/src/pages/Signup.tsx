import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Brand } from '../components/AppShell';
import { Button, CourtArtwork, Field } from '../components/ui';

export function Signup() {
  const { signUp, user } = useApp();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = params.get('returnTo') || '/courts';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate(returnTo, { replace: true });
  }, [navigate, returnTo, user]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (name.trim().length < 2) return setError('Tell us what we should call you.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.');
    if (password.length < 8) return setError('Choose a password with at least 8 characters.');
    setLoading(true);
    const result = await signUp({ name: name.trim(), email: email.trim(), password });
    setLoading(false);
    if (!result.ok) return setError(result.error);
    navigate(returnTo, { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-visual auth-visual--signup">
        <CourtArtwork variant={2} name="B-Sporthood club court" />
        <div className="auth-visual__overlay">
          <Brand />
          <div className="auth-benefits">
            <span>Made for people who play</span>
            <h2>A better way into the game.</h2>
            {['Book trusted courts in seconds', 'Keep every game in one place', 'Come back to your favourites'].map(
              (benefit) => (
                <p key={benefit}>
                  <Check size={17} /> {benefit}
                </p>
              ),
            )}
          </div>
          <span />
        </div>
      </section>
      <section className="auth-panel">
        <Link to="/" className="auth-panel__back">
          Back to B.Sporthood
        </Link>
        <div className="auth-form">
          <span className="auth-form__step">Join the club</span>
          <h1>Create your player profile.</h1>
          <p>One account for booking, managing, and returning to the courts you love.</p>
          <form onSubmit={submit} noValidate>
            <Field
              label="Your name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              leading={<UserRound size={17} />}
              placeholder="What should we call you?"
            />
            <Field
              label="Email address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              leading={<Mail size={17} />}
              placeholder="you@example.com"
            />
            <div className="password-field">
              <Field
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                leading={<LockKeyhole size={17} />}
                placeholder="At least 8 characters"
                hint="Use a demo-only password for this local experience."
              />
              <button
                type="button"
                className="password-field__toggle"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" loading={loading} trailingIcon>
              Create account
            </Button>
          </form>
          <p className="auth-form__switch">
            Already a member? <Link to={`/login?returnTo=${encodeURIComponent(returnTo)}`}>Sign in</Link>
          </p>
          <p className="auth-form__note">Demo only. Your account stays in this browser.</p>
        </div>
      </section>
    </main>
  );
}

