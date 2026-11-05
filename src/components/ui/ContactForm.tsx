'use client';
import React from 'react';

interface ContactFormProps {
  variant?: 'full' | 'sidebar';
  className?: string;
}

// Common country codes for phone numbers
const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+91', country: 'India' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+45', country: 'Denmark' },
  { code: '+358', country: 'Finland' },
  { code: '+41', country: 'Switzerland' },
  { code: '+43', country: 'Austria' },
  { code: '+32', country: 'Belgium' },
  { code: '+351', country: 'Portugal' },
  { code: '+353', country: 'Ireland' },
  { code: '+48', country: 'Poland' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+36', country: 'Hungary' },
  { code: '+30', country: 'Greece' },
  { code: '+90', country: 'Turkey' },
  { code: '+7', country: 'Russia' },
  { code: '+380', country: 'Ukraine' },
  { code: '+55', country: 'Brazil' },
  { code: '+54', country: 'Argentina' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+58', country: 'Venezuela' },
  { code: '+51', country: 'Peru' },
  { code: '+593', country: 'Ecuador' },
  { code: '+595', country: 'Paraguay' },
  { code: '+598', country: 'Uruguay' },
  { code: '+591', country: 'Bolivia' },
  { code: '+27', country: 'South Africa' },
  { code: '+234', country: 'Nigeria' },
  { code: '+254', country: 'Kenya' },
  { code: '+20', country: 'Egypt' },
  { code: '+212', country: 'Morocco' },
  { code: '+216', country: 'Tunisia' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+974', country: 'Qatar' },
  { code: '+973', country: 'Bahrain' },
  { code: '+965', country: 'Kuwait' },
  { code: '+968', country: 'Oman' },
  { code: '+962', country: 'Jordan' },
  { code: '+961', country: 'Lebanon' },
  { code: '+972', country: 'Israel' },
  { code: '+964', country: 'Iraq' },
  { code: '+98', country: 'Iran' },
  { code: '+93', country: 'Afghanistan' },
  { code: '+92', country: 'Pakistan' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+95', country: 'Myanmar' },
  { code: '+66', country: 'Thailand' },
  { code: '+84', country: 'Vietnam' },
  { code: '+855', country: 'Cambodia' },
  { code: '+856', country: 'Laos' },
  { code: '+60', country: 'Malaysia' },
  { code: '+65', country: 'Singapore' },
  { code: '+63', country: 'Philippines' },
  { code: '+82', country: 'South Korea' },
  { code: '+977', country: 'Nepal' },
  { code: '+975', country: 'Bhutan' },
  { code: '+960', country: 'Maldives' },
];

export default function ContactForm({ variant = 'full', className = '' }: ContactFormProps) {
  const formId = React.useId();
  const isSidebar = variant === 'sidebar';
  const fieldClassName =
    'w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-[var(--brand-ink)] transition-colors hover:border-slate-400 focus:outline-none focus:border-[var(--brand-ink)] focus:ring-2 focus:ring-[var(--brand-ink)]/20';
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    subject: '',
    message: '',
    website: '', // HONEYPOT: Bots fill this, humans don't see it
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          countryCode: '+1',
          phone: '',
          subject: '',
          message: '',
          website: '',
        });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`${isSidebar ? 'bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100' : 'min-w-0'} ${className}`}
    >
      {isSidebar && (
        <div className="bg-gradient-to-r from-brand-ink to-[#1E3A8A] p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 bg-white/10 rounded-full p-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
              <p className="text-blue-100 mt-1">Get expert help with your visa application</p>
            </div>
          </div>
        </div>
      )}

      <div className={isSidebar ? 'p-6' : ''}>
        {isSidebar && (
          <div className="bg-brand-surface-alt rounded-xl p-4 mb-6">
            <p className="text-brand-ink text-sm leading-relaxed">
              Our visa experts are here to help you 24/7. Fill out the form below and we&apos;ll get
              back to you as soon as possible with the information you need.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div
            role="status"
            className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 mb-4 text-center font-medium"
          >
            Thank you! Your message has been sent. Our team will get back to you soon.
          </div>
        )}
        {status === 'error' && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 mb-4 text-center font-medium"
          >
            {errorMsg}
          </div>
        )}

        <form
          className={
            isSidebar ? 'relative space-y-4' : 'relative grid grid-cols-1 gap-6 sm:grid-cols-2'
          }
          onSubmit={handleSubmit}
          aria-busy={status === 'loading'}
        >
          <div>
            <label
              htmlFor={`${formId}-full-name`}
              className="block text-sm font-medium text-brand-ink mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id={`${formId}-full-name`}
              name="fullName"
              autoComplete="name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className={
                isSidebar
                  ? `w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-brand-ink
                       focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent
                       transition-all duration-200 hover:border-[var(--brand-primary)]`
                  : fieldClassName
              }
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-email`}
              className="block text-sm font-medium text-brand-ink mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id={`${formId}-email`}
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={
                isSidebar
                  ? `w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-brand-ink
                       focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent
                       transition-all duration-200 hover:border-[var(--brand-primary)]`
                  : fieldClassName
              }
            />
          </div>

          <div className={isSidebar ? '' : 'sm:col-span-2'}>
            <label
              htmlFor={`${formId}-phone`}
              className="block text-sm font-medium text-brand-ink mb-2"
            >
              Phone Number *
            </label>
            <div
              className={
                isSidebar ? 'flex flex-col gap-2' : 'grid gap-3 sm:grid-cols-[176px_minmax(0,1fr)]'
              }
            >
              <select
                name="countryCode"
                aria-label="Country calling code"
                autoComplete="tel-country-code"
                value={formData.countryCode}
                onChange={handleChange}
                className={
                  isSidebar
                    ? `rounded-xl border-2 border-gray-200 px-3 py-3 text-base text-brand-ink
                         focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent
                         transition-all duration-200 hover:border-[var(--brand-primary)] min-w-[120px]`
                    : fieldClassName
                }
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {country.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id={`${formId}-phone`}
                name="phone"
                autoComplete="tel-national"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={
                  isSidebar
                    ? `flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-brand-ink
                         focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent
                         transition-all duration-200 hover:border-[var(--brand-primary)]`
                    : fieldClassName
                }
              />
            </div>
          </div>

          {variant === 'full' && (
            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-subject`}
                className="block text-sm font-medium text-brand-ink mb-2"
              >
                Subject *
              </label>
              <select
                id={`${formId}-subject`}
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={
                  isSidebar
                    ? `w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-brand-ink
                         focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent
                         transition-all duration-200 hover:border-[var(--brand-primary)]`
                    : fieldClassName
                }
              >
                <option value="">Select a subject</option>
                <option value="application">Visa Application</option>
                <option value="payment">Payment Issue</option>
                <option value="status">Application Status</option>
                <option value="requirements">Visa Requirements</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          <div className={isSidebar ? '' : 'sm:col-span-2'}>
            <label
              htmlFor={`${formId}-message`}
              className="block text-sm font-medium text-brand-ink mb-2"
            >
              {variant === 'full' ? 'Your Message *' : 'Your Question *'}
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              aria-describedby={isSidebar ? undefined : `${formId}-message-help`}
              required
              value={formData.message}
              onChange={handleChange}
              rows={variant === 'full' ? 5 : 3}
              className={
                isSidebar
                  ? `w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-brand-ink
                       focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent
                       transition-all duration-200 hover:border-[var(--brand-primary)]`
                  : fieldClassName
              }
            />
            {!isSidebar && (
              <p id={`${formId}-message-help`} className="mt-2 text-sm leading-6 text-slate-600">
                Do not include passwords, complete card details or sensitive documents.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={
              isSidebar
                ? `w-full px-8 py-4 rounded-xl font-bold text-white text-lg
                     bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-dark)] hover:from-[var(--brand-primary-dark)] hover:to-[#1e40af]
                     transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                     shadow-lg hover:shadow-xl flex items-center justify-center gap-2`
                : 'inline-flex min-h-12 items-center justify-center gap-3 justify-self-start rounded-lg bg-[var(--brand-primary)] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--brand-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-ink)] disabled:cursor-wait disabled:opacity-60 sm:col-span-2'
            }
          >
            <span>{status === 'loading' ? 'Sending message…' : 'Send Message'}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25M19 12H4.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* HONEYPOT: Hidden field - if filled, it's a bot */}
          <div
            className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <label htmlFor="website">Website (leave blank)</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
