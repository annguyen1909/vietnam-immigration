export default function HomeDisclaimer() {
  return (
    <section className="pb-16 pt-4">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-brand-border shadow-sm">
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 shrink-0 text-brand-primary mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h2 className="font-display text-xl font-bold text-brand-ink">Service disclaimer</h2>
              <div className="mt-4 space-y-4 text-sm text-brand-muted leading-relaxed">
                <p>
                  <strong className="text-brand-ink">vietnamemigration.com</strong> is operated by
                  Vietnam eVisa Assistance Team, a private company providing
                  visa application preparation and support. We are{' '}
                  <strong className="text-brand-ink">not affiliated with</strong> the Government of
                  Vietnam or any official immigration authority.
                </p>
                <p>
                  By using our service, you agree to pay the government visa fee plus our service
                  fee, which is disclosed clearly before payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
