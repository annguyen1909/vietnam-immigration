import { ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const US_PHONE = '+1 323 286 4541';
// const UK_PHONE = '+44 5555 000000'; // Hidden but not deleted
import { VIETNAM_PROCESSING_TIME } from '@/lib/vietnamPricing';

const EMAIL = 'Visa@VietnamEmigration.com';

export default function SupportBox() {
  return (
    <div className="space-y-6 mt-8">
      {/* Experts Available 24/7 */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
          <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2 text-brand-primary" />
          EXPERTS AVAILABLE 24/7
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${EMAIL}`} className="text-brand-primary hover:underline">
              {EMAIL}
            </a>
          </p>
          <div className="flex items-center gap-2 text-gray-800">
            <span className="text-xl">🇺🇸</span>
            <span className="font-medium">United States</span>
            <span className="ml-auto font-semibold tracking-wide">{US_PHONE}</span>
          </div>
          {/* UK phone number hidden but not deleted */}
          {/* <div className="flex items-center gap-2 text-gray-800">
            <span className="text-xl">🇬🇧</span>
            <span className="font-medium">United Kingdom</span>
            <span className="ml-auto font-semibold tracking-wide">{UK_PHONE}</span>
          </div> */}
          <Link
            href="/worldwide-phone"
            className="text-brand-primary underline font-medium text-sm pt-1 block text-center w-full"
          >
            Worldwide phone support
          </Link>
        </div>
      </div>

      {/* Apply with confidence */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
          <ShieldCheckIcon className="h-6 w-6 mr-2 text-green-600" />
          APPLY WITH CONFIDENCE
        </h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✔</span>
            <span>Fast, secure, and reliable visa processing</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✔</span>
            <span>Safe online payment—no hidden fees</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✔</span>
            <span>Most visas approved within {VIETNAM_PROCESSING_TIME}</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✔</span>
            <span>
              Optional Urgent / Super Urgent processing at apply—fees shown before you pay
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✔</span>
            <span>Transparent pricing, no surprises</span>
          </li>
          <li className="flex items-start font-semibold">
            <span className="text-green-500 mr-2 mt-1">✔</span>
            <span>100% Service Fees Returned if Rejected</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
