'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import SiteFooter from '@/components/layout/SiteFooter';
import notFoundAnimation from '../../public/img/404.json';

export default function NotFound() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportData, setReportData] = useState({
    brokenUrl: '',
    email: '',
    message: '',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Broken link report:', reportData);
    alert("Thank you for reporting this broken link! We'll fix it as soon as possible.");
    setShowReportForm(false);
    setReportData({ brokenUrl: '', email: '', message: '' });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-surface-alt to-brand-surface flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Lottie Animation */}
          <div className="w-48 h-48 mx-auto mb-6">
            <Lottie
              animationData={notFoundAnimation}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-6xl font-bold text-brand-ink mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-4">
              We&apos;re here to help you navigate back to the right place.
            </p>

            {/* Random Visa Joke */}
            {mounted && (
              <div className="bg-gradient-to-r from-brand-surface-alt to-brand-surface rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-brand-ink mb-2">Visa Joke of the Day</h3>
                <p className="text-gray-700 italic">
                  &quot;Why did the visa application go to therapy? Because it had too many
                  attachment issues!&quot;
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/"
                className="bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🏠 Go Home
              </Link>

              <button
                onClick={() => setShowReportForm(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🚨 Report Broken Link
              </button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/apply"
                className="bg-brand-surface-alt hover:bg-brand-surface-alt p-4 rounded-lg transition-colors duration-200"
              >
                <h3 className="font-semibold text-brand-primary-dark mb-1">Apply for Visa</h3>
                <p className="text-sm text-brand-primary">Start your application</p>
              </Link>

              <Link
                href="/check-requirement"
                className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors duration-200"
              >
                <h3 className="font-semibold text-green-800 mb-1">Check Requirements</h3>
                <p className="text-sm text-green-600">See what you need</p>
              </Link>

              <Link
                href="/contact"
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors duration-200"
              >
                <h3 className="font-semibold text-purple-800 mb-1">Contact Support</h3>
                <p className="text-sm text-purple-600">Get expert help</p>
              </Link>
            </div>
          </div>

          {/* Report Form Modal */}
          {showReportForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Report Broken Link</h3>
                <p className="text-gray-600 mb-6">
                  Help us fix this broken link so other travelers don&apos;t get lost!
                </p>

                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Broken URL
                    </label>
                    <input
                      type="url"
                      value={reportData.brokenUrl}
                      onChange={(e) => setReportData({ ...reportData, brokenUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="https://example.com/broken-page"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={reportData.email}
                      onChange={(e) => setReportData({ ...reportData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      value={reportData.message}
                      onChange={(e) => setReportData({ ...reportData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      rows={3}
                      placeholder="Tell us more about what you were looking for..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Submit Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
