import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import {
  TextInput,
  TextArea,
  SelectInput,
  CheckboxGroup,
  ConsentCheckbox,
  validateEmail,
  validatePhone,
} from '@/components/FormField';
import FormConfirmation from '@/components/FormConfirmation';
import SelectedIngredientBadge from '@/components/SelectedIngredientBadge';
import { buildSampleFormUrl, type SampleFormData } from '@/utils/googleForms';
import { ingredients } from '@/data/ingredients';
import ImageWithFallback from '@/components/ImageWithFallback';

const requestTypeOptions = [
  'Product Sample',
  'Technical Data Sheet (TDS)',
  'Certificate of Analysis (COA)',
  'Safety Data Sheet (SDS)',
  'Product Specifications',
  'Ingredient / Formulation Information',
  'Availability Information',
  'Other',
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

const sampleOptions = [
  'Small laboratory sample',
  '100 g',
  '250 g',
  '500 g',
  '1 kg',
  'Other',
  'Not applicable',
];

const consentText =
  'I confirm that the information provided by me is accurate and complete. I authorize Saundarya Veda to contact me regarding my sample request, product enquiry, technical documentation, product information, and potential B2B requirements. I consent to the use of the information provided for these business communication and enquiry-related purposes.';

export default function RequestSample() {
  useSEO({
    title: 'Sample & Product Enquiry | Saundarya Veda',
    description:
      'Request samples, technical data sheets or product information for beauty and cosmetic ingredients.',
  });

  const [searchParams] = useSearchParams();
  const ingredientParam = searchParams.get('ingredient') || '';

  const [data, setData] = useState<SampleFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    ingredient: ingredientParam,
    requestType: [],
    application: '',
    sampleRequirement: '',
    location: '',
    additionalInformation: '',
    consent: false,
  });

  useEffect(() => {
    if (ingredientParam) {
      setData((prev) => ({ ...prev, ingredient: ingredientParam }));
    }
  }, [ingredientParam]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const update = <K extends keyof SampleFormData>(key: K, value: SampleFormData[K]) => {
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
    if (!data.ingredient.trim()) e.ingredient = 'Please specify an ingredient or product';
    if (data.requestType.length === 0) e.requestType = 'Please select at least one request type';
    if (!data.application) e.application = 'Please select an application';
    if (!data.location.trim()) e.location = 'Delivery / business location is required';
    if (!data.consent) e.consent = 'Please provide your consent to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = buildSampleFormUrl(data);
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
        title="Sample & Product Enquiry"
        description="Request samples, technical documentation or product information for beauty and cosmetic ingredients."
        breadcrumb="Request a Sample"
      />

      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-pink/40 mb-6">
              <ImageWithFallback src={ingredients[0].image} alt="Botanical ingredient sample preparation" className="h-full w-full object-cover" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-3">Evaluation support</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-charcoal mb-4">Request what your team needs to evaluate.</h2>
            <p className="text-sm leading-relaxed text-brand-text-secondary mb-5">Use this enquiry for samples, product information or available technical documentation related to an ingredient.</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-brand-charcoal">
              <span className="rounded-lg bg-brand-pink-light px-3 py-2">Samples</span><span className="rounded-lg bg-brand-pink-light px-3 py-2">TDS / COA</span><span className="rounded-lg bg-brand-pink-light px-3 py-2">SDS</span><span className="rounded-lg bg-brand-pink-light px-3 py-2">Availability</span>
            </div>
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
                  Which ingredient or product are you enquiring about? <span className="text-brand-pink-deep">*</span>
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

              <CheckboxGroup
                label="What would you like to request?"
                name="requestType"
                values={data.requestType}
                options={requestTypeOptions}
                onChange={(v) => update('requestType', v)}
                required
                error={errors.requestType}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <SelectInput
                  label="What is the intended application?"
                  name="application"
                  value={data.application}
                  onChange={(v) => update('application', v)}
                  options={applicationOptions}
                  required
                  error={errors.application}
                  placeholder="Select application"
                />
                <SelectInput
                  label="If requesting a sample, what quantity do you require?"
                  name="sampleRequirement"
                  value={data.sampleRequirement}
                  onChange={(v) => update('sampleRequirement', v)}
                  options={sampleOptions}
                  placeholder="Select sample quantity"
                />
              </div>

              <TextInput
                label="Delivery / Business Location"
                name="location"
                value={data.location}
                onChange={(v) => update('location', v)}
                placeholder="City, State, Country"
                required
                error={errors.location}
              />

              <TextArea
                label="Additional Requirements / Message"
                name="additionalInformation"
                value={data.additionalInformation}
                onChange={(v) => update('additionalInformation', v)}
                placeholder="Share any specific requirements or questions..."
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
