'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SiteFooter from '@/components/layout/SiteFooter';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from '@/contexts/AuthContext';
import countryCallingCodes from '@/data/countryCallingCodes.json';

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

// Helper to get country info by ISO code (2-letter, lowercase)
const getCountryInfo = (iso2: string) => {
  const entry = countryCallingCodes.find((c) => c.code.toLowerCase() === iso2.toLowerCase());
  return entry ? { code: `+${entry.callingCode}`, country: entry.name } : { code: '', country: '' };
};

export default function RegisterPage() {
  const router = useRouter();
  const { login, user, loading } = useAuth();

  // Redirect logged-in users to /apply
  useEffect(() => {
    if (!loading && user) {
      router.replace('/apply');
    }
  }, [user, loading, router]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('us');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handlePhoneChange = (value: string, country: { countryCode: string }) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setSelectedCountry(country.countryCode);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const { code: areaCode, country } = getCountryInfo(selectedCountry);
    const formattedAreaCode = areaCode && country ? `${areaCode} ${country}` : '';
    // react-phone-input-2 already provides the full phone number with country code
    const fullPhoneNumber = formData.phone;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          areaCode: formattedAreaCode,
          phoneNumber: fullPhoneNumber,
          gender: formData.gender,
          password: formData.password,
          websiteCreatedAt: 'Vietnam Local Site',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Automatically log in the user
      login(data.account);
      setSuccess('Account created successfully! Redirecting to account...');

      // Clear form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      });

      // Redirect to account after a short delay
      setTimeout(() => {
        router.push('/account');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary">
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-xl">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Image
                src="/img/vietnam-flag.svg"
                alt="Vietnam flag"
                width={48}
                height={48}
                className="block h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">Vietnam eVisa</span>
                <span className="text-sm text-gray-300">Create Account</span>
              </div>
            </Link>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-brand-ink mb-2 text-center">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Join thousands of travelers who trust us with their Vietnam visa applications.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                <p className="font-medium">Success</p>
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all placeholder-gray-400 text-brand-ink"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Phone Field with Country Code */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <PhoneInput
                  country={selectedCountry}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disableCountryGuess={true}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    id: 'phone',
                    style: {
                      width: '100%',
                      color: 'var(--brand-ink)',
                      backgroundColor: '#ffffff',
                    },
                  }}
                  enableSearch
                  inputStyle={{
                    width: '100%',
                    color: 'var(--brand-ink)',
                    backgroundColor: '#ffffff',
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all placeholder-gray-400 text-brand-ink"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Gender Field */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all text-brand-ink"
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all placeholder-gray-400 text-brand-ink"
                      placeholder="Create password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all placeholder-gray-400 text-brand-ink"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] border-gray-300 rounded"
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-600">
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)]"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)]"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.agreeToTerms}
                className={`w-full flex items-center justify-center px-8 py-3 rounded-xl font-bold text-white text-lg
                         bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-dark)] hover:from-[var(--brand-primary-dark)] hover:to-[#1e40af]
                         transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl ${isLoading || !formData.agreeToTerms ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center mt-6">
                <span className="text-gray-600">Already have an account?</span>{' '}
                <Link
                  href="/login"
                  className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)] font-medium"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure Registration
            </div>
            Your information is encrypted and protected
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
