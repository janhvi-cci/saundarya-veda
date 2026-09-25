import { useState } from 'react';
import { ExternalLink, ArrowLeft, AlertCircle } from 'lucide-react';

interface FormConfirmationProps {
  title?: string;
  googleFormUrl: string | null;
  onEdit: () => void;
  errorMessage?: string;
}

export default function FormConfirmation({
  title = 'Your Details Are Ready',
  googleFormUrl,
  onEdit,
  errorMessage,
}: FormConfirmationProps) {
  const [openError, setOpenError] = useState(false);

  if (errorMessage) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-brand-charcoal mb-3">
          Something went wrong
        </h3>
        <p className="text-sm text-brand-text-secondary mb-6 max-w-md mx-auto">
          {errorMessage}
        </p>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Edit Details
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-brand-pink-light flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-brand-pink-deep" />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-brand-charcoal mb-3">
        {title}
      </h3>
      <p className="text-sm text-brand-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
        We've prepared your enquiry with the information you provided. Continue to the Google Form to review and submit your request.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={googleFormUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (!googleFormUrl) {
              setOpenError(true);
            }
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all shadow-sm hover:shadow-md"
        >
          Continue to Google Form
          <ExternalLink className="w-4 h-4" />
        </a>
        <button
          onClick={onEdit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-brand-charcoal border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Edit Details
        </button>
      </div>
      {openError && (
        <p className="mt-4 text-xs text-red-500">
          Could not generate the Google Form URL. Please try again.
        </p>
      )}
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
