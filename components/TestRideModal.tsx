import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Scooter } from '../lib/types';

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  scooters: Scooter[];
  preselectedScooterId?: string;
}

const fieldClasses =
  'w-full rounded-xl border border-line bg-page-alt px-3.5 py-2.5 text-sm text-ink ' +
  'placeholder-faint transition-colors hover:border-ink/20 focus:border-brand-600 focus:outline-none';

const labelClasses =
  'flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted';

/**
 * Mounts the dialog only while open, so every open starts from a clean form
 * with the model that was actually clicked preselected.
 */
export const TestRideModal: React.FC<TestRideModalProps> = ({ isOpen, ...props }) => {
  if (!isOpen) return null;
  return <TestRideDialog {...props} />;
};

const TestRideDialog: React.FC<Omit<TestRideModalProps, 'isOpen'>> = ({
  onClose,
  scooters,
  preselectedScooterId,
}) => {
  const [selectedScooter, setSelectedScooter] = useState(
    preselectedScooterId || scooters[0]?.id || ''
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jawalakhel, Lalitpur');
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 3200);
  };

  const chosen = scooters.find((s) => s.id === selectedScooter);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a test ride"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-card shadow-lift animate-fade-up"
      >
        {/* Brand seam across the top edge */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 to-brand-400" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-2 text-muted transition-colors hover:bg-page-alt hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="relative space-y-4 px-6 py-14 text-center sm:px-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">Request received</h3>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-body">
              Thanks{fullName ? `, ${fullName.split(' ')[0]}` : ''}. Our team will call you on{' '}
              <span className="font-semibold text-ink">{phone}</span> to confirm your test ride
              {chosen ? ` of the ${chosen.name}` : ''}.
            </p>
            <p className="text-xs text-muted">Jawalakhel, Lalitpur · Sun–Fri, 9:00 AM – 6:30 PM</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative space-y-5 p-6 sm:p-8">
            <div className="flex items-center gap-3.5 border-b border-line pb-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Book a test ride</h3>
                <p className="text-xs text-muted">
                  Ride it yourself at our Jawalakhel showroom — no obligation.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tr-model" className={labelClasses}>
                Model
              </label>
              <select
                id="tr-model"
                value={selectedScooter}
                onChange={(e) => setSelectedScooter(e.target.value)}
                className={fieldClasses}
                required
              >
                {scooters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — Rs. {s.price.toLocaleString()} ({s.specs.range})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="tr-name" className={labelClasses}>
                  <User className="h-3 w-3 text-brand-600" />
                  Full name
                </label>
                <input
                  id="tr-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ram Sharma"
                  className={fieldClasses}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="tr-phone" className={labelClasses}>
                  <Phone className="h-3 w-3 text-brand-600" />
                  Phone
                </label>
                <input
                  id="tr-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977 9801234567"
                  className={fieldClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="tr-email" className={labelClasses}>
                  <Mail className="h-3 w-3 text-brand-600" />
                  Email
                </label>
                <input
                  id="tr-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ram@example.com"
                  className={fieldClasses}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="tr-date" className={labelClasses}>
                  <Calendar className="h-3 w-3 text-brand-600" />
                  Preferred date
                </label>
                <input
                  id="tr-date"
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className={fieldClasses}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tr-city" className={labelClasses}>
                <MapPin className="h-3 w-3 text-brand-600" />
                Showroom
              </label>
              <input
                id="tr-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Jawalakhel, Lalitpur"
                className={fieldClasses}
              />
            </div>

            <button
              type="submit"
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-semibold text-white shadow-brand transition-all hover:bg-brand-700 hover:shadow-[0_20px_44px_-12px_rgb(225_6_0/0.55)] active:scale-[0.99]"
            >
              <span>Confirm test ride</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="text-center text-[11px] text-muted">
              We only use your details to arrange the ride.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
