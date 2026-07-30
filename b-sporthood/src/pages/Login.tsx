import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_ACCOUNT } from '../services/auth';
import { Brand } from '../components/AppShell';
import { Button, CourtArtwork, Field } from '../components/ui';

export function Login() {
  const { login, user } = useApp();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = params.get('returnTo') || '/courts';
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
    if (!email.trim() || !password) {
      setError('Enter both your email and password.');
      return;
    }
    setLoading(true);
    const result = await login({ email: email.trim(), password });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(returnTo, { replace: true });
  };

  const useDemo = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setError('');
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <CourtArtwork variant={3} name="B-Sporthood club court" />
        <div className="auth-visual__overlay">
          <Brand />
          <div>
            <span className="auth-visual__quote">“</span>
            <blockquote>Great games start with finding the right place to play.</blockquote>
            <p>Bengaluru’s court community, all in one place.</p>
          </div>
          <span className="auth-visual__trust">
            <ShieldCheck size={17} /> Secure demo experience
          </span>
        </div>
      </section>
      <section className="auth-panel">
        <Link to="/" className="auth-panel__back">
          Back to B.Sporthood
        </Link>
        <div className="auth-form">
          <span className="auth-form__step">Welcome back</span>
          <h1>Your court is waiting.</h1>
          <p>Sign in to complete your booking and keep every session organised.</p>

          <button className="demo-account" type="button" onClick={useDemo}>
            <span className="demo-account__icon">
              <Check size={17} />
            </span>
            <span>
              <strong>Use the demo account</strong>
              <small>{DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}</small>
            </span>
            <span className="demo-account__use">Use</span>
          </button>

          <div className="auth-divider">
            <span>or sign in manually</span>
          </div>

          <form onSubmit={submit} noValidate>
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
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                leading={<LockKeyhole size={17} />}
                placeholder="Enter your password"
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
              Sign in
            </Button>
          </form>
          <p className="auth-form__switch">
            New to B.Sporthood?{' '}
            <Link to={`/signup?returnTo=${encodeURIComponent(returnTo)}`}>Create an account</Link>
          </p>
          <p className="auth-form__note">Demo only. Do not use a real password.</p>
        </div>
      </section>
    </main>
  );
}

