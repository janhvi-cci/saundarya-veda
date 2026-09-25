import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import {
  TextInput,
  TextArea,
  SelectInput,
  ConsentCheckbox,
  validateEmail,
  validatePhone,
} from '@/components/FormField';
import FormConfirmation from '@/components/FormConfirmation';
import SelectedIngredientBadge from '@/components/SelectedIngredientBadge';
import { buildQuoteFormUrl, type QuoteFormData } from '@/utils/googleForms';
import { ingredients } from '@/data/ingredients';
import ImageWithFallback from '@/components/ImageWithFallback';

const quantityOptions = [
  'Less than 10 kg',
  '10–50 kg',
  '50–100 kg',
  '100–500 kg',
  '500+ kg',
  'I am not sure yet',
];

const applicationOptions = [
  'Skincare',
  'Haircare',
  'Body Care',
  'Makeup / Color Cosmetics',
  'Fragrance',
  'Oral Care',
  'Personal Care',
  'Wellness / Beauty Supplements',
  'Research & Development',
  'Other',
];

const packagingOptions = [
  'Small quantity / Sample',
  '1–5 kg',
  '5–25 kg',
  '25–50 kg',
  '50–100 kg',
  '100+ kg',
  'Not sure / Please advise',
];

const consentText =
  'I confirm that the information provided by me is accurate and complete. I authorize Saundarya Veda to contact me regarding this quotation, product availability, pricing, samples, product information, and potential B2B business requirements. I consent to the use of the information provided for these business communication and enquiry-related purposes.';

export default function RequestQuote() {
  useSEO({
    title: 'Request a Quote | Saundarya Veda',
    description:
      'Request a quotation for beauty and cosmetic ingredients from Saundarya Veda.',
  });

  const [searchParams] = useSearchParams();
  const ingredientParam = searchParams.get('ingredient') || '';

  const [data, setData] = useState<QuoteFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    ingredient: ingredientParam,
    quantity: '',
    application: '',
    packaging: '',
    location: '',
    additionalRequirements: '',
    consent: false,
  });

  // Update ingredient when URL param changes
  useEffect(() => {
    if (ingredientParam) {
      setData((prev) => ({ ...prev, ingredient: ingredientParam }));
    }
  }, [ingredientParam]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!data.companyName.trim()) e.companyName = 'Company name is required';
    if (!data.contactPerson.trim()) e.contactPerson = 'Contact person is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!validateEmail(data.email)) e.email = 'Please enter a valid email address';
    if (!data.phone.trim()) e.phone = 'Phone number is required';
    else if (!validatePhone(data.phone)) e.phone = 'Please enter a valid phone number';
    if (!data.ingredient.trim()) e.ingredient = 'Please specify an ingredient';
    if (!data.quantity) e.quantity = 'Please select a quantity';
    if (!data.application) e.application = 'Please select an application';
    if (!data.packaging) e.packaging = 'Please select a packaging preference';
    if (!data.location.trim()) e.location = 'Delivery location is required';
    if (!data.consent) e.consent = 'Please provide your consent to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = buildQuoteFormUrl(data);
      if (!url) throw new Error('URL generation failed');
      setGoogleFormUrl(url);
      setSubmitted(true);
      setErrorMessage('');
    } catch {
      setErrorMessage(
        'Something went wrong while preparing your request. Please check your details and try again.'
      );
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
    setGoogleFormUrl(null);
    setErrorMessage('');
  };

  return (
    <div className="pt-16 lg:pt-18">
      <PageHeader
        title="Request a Quote"
        description="Tell us about your ingredient requirement and we'll prepare a quotation for you."
        breadcrumb="Request a Quote"
      />

      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-2xl border border-brand-pink/40 mb-6">
              <ImageWithFallback src={ingredients[3].image} alt="Plant-based cosmetic ingredients prepared for quotation" className="w-full h-auto object-cover" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-3">Prepare your enquiry</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-charcoal mb-4">A clearer brief helps us guide the next step.</h2>
            <p className="text-sm leading-relaxed text-brand-text-secondary mb-5">Share the ingredient, intended application and approximate requirement. Information is available on request where a detail is not yet decided.</p>
            <ul className="space-y-3 text-sm text-brand-charcoal">
              <li>Ingredient or category of interest</li>
              <li>Application and formulation direction</li>
              <li>Quantity, packaging and delivery location</li>
            </ul>
          </aside>
          <div>
            {/* Pre-selected ingredient indicator */}
            {data.ingredient && !submitted && !errorMessage && (
              <SelectedIngredientBadge name={data.ingredient} />
            )}

            {submitted || errorMessage ? (
              <FormConfirmation
                googleFormUrl={googleFormUrl}
                onEdit={handleEdit}
                errorMessage={errorMessage}
              />
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <TextInput
                label="Company / Business Name"
                name="companyName"
                value={data.companyName}
                onChange={(v) => update('companyName', v)}
                placeholder="Your company name"
                required
                error={errors.companyName}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <TextInput
                  label="Contact Person Name"
                  name="contactPerson"
                  value={data.contactPerson}
                  onChange={(v) => update('contactPerson', v)}
                  placeholder="Your name"
                  required
                  error={errors.contactPerson}
                />
                <TextInput
                  label="Business Email Address"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(v) => update('email', v)}
                  placeholder="you@company.com"
                  required
                  error={errors.email}
                />
              </div>

              <TextInput
                label="Phone / WhatsApp Number"
                name="phone"
                value={data.phone}
                onChange={(v) => update('phone', v)}
                placeholder="+91 98765 43210"
                required
                error={errors.phone}
              />

              {/* Ingredient field — dynamic */}
              <div>
                <label htmlFor="ingredient" className="block text-sm font-medium text-brand-charcoal mb-1.5">
                  Which ingredient are you interested in? <span className="text-brand-pink-deep">*</span>
                </label>
                <input
                  id="ingredient"
                  name="ingredient"
                  type="text"
                  value={data.ingredient}
                  onChange={(e) => update('ingredient', e.target.value)}
                  placeholder="Type or select an ingredient"
                  list="ingredient-list"
                  required
                  className={`w-full px-4 py-3 text-sm rounded-lg border bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink-deep/20 ${
                    errors.ingredient
                      ? 'border-red-400'
                      : 'border-brand-pink/50 focus:border-brand-pink-deep'
                  }`}
                />
                <datalist id="ingredient-list">
                  {ingredients.map((i) => (
                    <option key={i.id} value={i.name} />
                  ))}
                </datalist>
                {errors.ingredient && (
                  <p className="mt-1 text-xs text-red-500">{errors.ingredient}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <SelectInput
                  label="Approximate Quantity Required"
                  name="quantity"
                  value={data.quantity}
                  onChange={(v) => update('quantity', v)}
                  options={quantityOptions}
                  required
                  error={errors.quantity}
                  placeholder="Select quantity"
                />
                <SelectInput
                  label="What will the ingredient be used for?"
                  name="application"
                  value={data.application}
                  onChange={(v) => update('application', v)}
                  options={applicationOptions}
                  required
                  error={errors.application}
                  placeholder="Select application"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <SelectInput
                  label="Preferred Packaging / Quantity"
                  name="packaging"
                  value={data.packaging}
                  onChange={(v) => update('packaging', v)}
                  options={packagingOptions}
                  required
                  error={errors.packaging}
                  placeholder="Select packaging"
                />
                <TextInput
                  label="Delivery Location"
                  name="location"
                  value={data.location}
                  onChange={(v) => update('location', v)}
                  placeholder="City, State, Country"
                  required
                  error={errors.location}
                />
              </div>

              <TextArea
                label="Additional Requirements / Message"
                name="additionalRequirements"
                value={data.additionalRequirements}
                onChange={(v) => update('additionalRequirements', v)}
                placeholder="Share any specific requirements, formulation details, or questions..."
                rows={5}
              />

              <ConsentCheckbox
                label={consentText}
                name="consent"
                checked={data.consent}
                onChange={(v) => update('consent', v)}
                error={errors.consent}
              />

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-medium text-white bg-brand-pink-deep rounded-lg hover:bg-brand-pink-deep/90 transition-all shadow-sm hover:shadow-md"
              >
                Continue to Google Form
              </button>
            </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
