import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { ArrowRight, LoaderCircle, X } from 'lucide-react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger';
  size?: 'default' | 'small';
  loading?: boolean;
  trailingIcon?: boolean;
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'default',
  loading = false,
  trailingIcon = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderCircle className="spin" size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
      {trailingIcon && !loading ? <ArrowRight size={17} aria-hidden="true" /> : null}
    </button>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'mint' | 'blue' | 'warning';
  className?: string;
}) {
  return <span className={`badge badge--${tone} ${className}`}>{children}</span>;
}

export function Chip({
  children,
  selected,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      className={`chip ${selected ? 'chip--selected' : ''} ${className}`}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
};

export function Field({ label, hint, error, leading, id, className = '', ...props }: FieldProps) {
  const inputId = id || `field-${label.toLowerCase().replace(/\s/g, '-')}`;
  const descriptionId = `${inputId}-description`;
  const accessibleLabel = props['aria-label'] ?? label;
  return (
    <label className={`field ${className}`} htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <span className={`field__control ${error ? 'field__control--error' : ''}`}>
        {leading ? <span className="field__leading">{leading}</span> : null}
        <input
          id={inputId}
          aria-label={accessibleLabel}
          aria-invalid={Boolean(error)}
          aria-describedby={hint || error ? descriptionId : undefined}
          {...props}
        />
      </span>
      {error ? (
        <span className="field__error" id={descriptionId} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="field__hint" id={descriptionId}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
};

export function Select({ label, id, children, className = '', ...props }: SelectProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s/g, '-')}`;
  const accessibleLabel = props['aria-label'] ?? label;
  return (
    <label className={`field ${className}`} htmlFor={selectId}>
      <span className="field__label">{label}</span>
      <span className="field__control field__control--select">
        <select id={selectId} aria-label={accessibleLabel} {...props}>
          {children}
        </select>
      </span>
    </label>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      {icon ? <div className="empty-state__icon">{icon}</div> : null}
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}

export function Skeleton({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`skeleton ${className}`} aria-hidden="true" {...props} />;
}

export function CourtArtwork({
  variant = 0,
  name,
  image,
  className = '',
}: {
  variant?: number;
  name: string;
  image?: string;
  className?: string;
}) {
  return (
    <div className={`court-art court-art--${variant % 4} ${className}`}>
      {image ? (
        <img
          src={image}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      <span className="court-art__wash" />
      <span className="court-art__court" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="sr-only">Preview of {name}</span>
    </div>
  );
}

export function Dialog({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('button, a, input, select')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, [tabindex]:not([tabindex="-1"])'),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.classList.add('dialog-open');
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('dialog-open');
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;
  return (
    <div className="dialog-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? 'dialog-description' : undefined}
      >
        <button className="icon-button dialog__close" onClick={onClose} aria-label="Close dialog">
          <X size={19} />
        </button>
        <h2 id="dialog-title">{title}</h2>
        {description ? <p id="dialog-description">{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
