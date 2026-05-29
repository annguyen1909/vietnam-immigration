'use client';

interface ApplicationProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Contact & Visa', shortTitle: 'Contact' },
  { number: 2, title: 'Passengers', shortTitle: 'Passengers' },
  { number: 3, title: 'Payment', shortTitle: 'Payment' },
  { number: 4, title: 'Documents', shortTitle: 'Documents' },
] as const;

export default function ApplicationProgress({ currentStep }: ApplicationProgressProps) {
  return (
    <nav aria-label="Application progress" className="w-full">
      {/* Desktop */}
      <ol className="hidden md:flex items-center w-full list-none p-0 m-0">
        {steps.map((step, index) => {
          const isActive = currentStep >= step.number;
          const isComplete = currentStep > step.number;

          return (
            <li
              key={step.number}
              className={`flex items-center min-w-0 ${index < steps.length - 1 ? 'flex-1' : 'shrink-0'}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 shrink-0">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    isActive
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-brand-primary-dark' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="mx-3 lg:mx-5 h-0.5 flex-1 min-w-[1rem] rounded-full bg-gray-200 overflow-hidden"
                  aria-hidden
                >
                  <div
                    className={`h-full rounded-full bg-brand-primary transition-all duration-500 ease-out ${
                      isComplete ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile */}
      <ol className="md:hidden flex items-center justify-between gap-1 list-none p-0 m-0">
        {steps.map((step) => {
          const isActive = currentStep >= step.number;

          return (
            <li key={step.number} className="flex flex-1 flex-col items-center min-w-0 px-0.5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                  isActive
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {step.number}
              </span>
              <span
                className={`mt-1.5 text-[10px] sm:text-xs font-medium text-center leading-tight truncate w-full ${
                  isActive ? 'text-brand-primary-dark' : 'text-gray-500'
                }`}
                title={step.title}
              >
                {step.shortTitle}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
