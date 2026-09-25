import { useState } from 'react';
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
import {
  buildRegistrationFormUrl,
  type RegistrationFormData,
} from '@/utils/googleForms';
import ImageWithFallback from '@/components/ImageWithFallback';
import { ingredients } from '@/data/ingredients';

const businessTypes = [
  'Beauty / Cosmetics Brand',
  'Cosmetic Manufacturer',
  'Contract / Private Label Manufacturer',
  'Personal Care Manufacturer',
  'Ingredient Distributor / Trader',
  'Formulation / R&D Company',
  'Other',
];

const productOptions = [
  'Skincare',
  'Haircare',
  'Body Care',
  'Makeup / Color Cosmetics',
  'Fragrances',
  'Oral Care',
  'Personal Care',
  'Wellness / Beauty Supplements',
  'Other',
];

const ingredientOptions = [
  'Natural Extracts',
  'Botanical Ingredients',
  'Cosmetic Actives',
  'Essential Oils',
  'Carrier Oils',
  'Butters & Waxes',
  'Natural Powders',
  'Functional Ingredients',
  'Other',
];

const requirementOptions = [
  'Less than 10 kg per month',
  '10–50 kg per month',
  '50–100 kg per month',
  '100–500 kg per month',
  '500+ kg per month',
  'Not sure yet / Depends on formulation',
];

const consentText =
  'I confirm that the information provided by me is accurate and complete. I authorize Saundarya Veda to contact me regarding my business enquiry, product requirements, samples, quotations, and potential B2B collaboration. I consent to the use of the information provided for these business communication and enquiry-related purposes.';

const initialData: RegistrationFormData = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  businessType: '',
  products: [],
  ingredients: [],
  requirement: '',
  location: '',
  additionalRequirements: '',
  consent: false,
};

export default function BecomePartner() {
  useSEO({
    title: 'Become a B2B Partner | Saundarya Veda',
    description:
      'Register as a B2B partner with Saundarya Veda. Tell us about your business and ingredient requirements.',
  });

  const [data, setData] = useState<RegistrationFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const update = <K extends keyof RegistrationFormData>(key: K, value: RegistrationFormData[K]) => {
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
    if (!data.businessType) e.businessType = 'Please select your business type';
    if (data.products.length === 0) e.products = 'Please select at least one product type';
    if (data.ingredients.length === 0) e.ingredients = 'Please select at least one ingredient type';
    if (!data.requirement) e.requirement = 'Please select your approximate requirement';
    if (!data.location.trim()) e.location = 'Business / delivery location is required';
    if (!data.consent) e.consent = 'Please provide your consent to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = buildRegistrationFormUrl(data);
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
        title="Become a B2B Partner"
        description="Tell us about your business and ingredient requirements. Our team can help you explore suitable ingredients, samples and quotation options."
        breadcrumb="Become a Partner"
      />

      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-pink/40 mb-6">
              <ImageWithFallback src={ingredients[5].image} alt="Botanical oils for B2B beauty formulation" className="h-full w-full object-cover" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-3">Built for businesses</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-charcoal mb-4">A practical starting point for ongoing sourcing.</h2>
            <p className="text-sm leading-relaxed text-brand-text-secondary mb-5">Tell us who you are, what you make and which ingredient categories matter to your team. We can then direct the right product, sample and information enquiry.</p>
            <div className="space-y-2 text-sm text-brand-charcoal"><p>Brands and manufacturers</p><p>Formulation and R&amp;D teams</p><p>Private-label and ingredient businesses</p></div>
          </aside>
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
                label="Business Contact Number / WhatsApp Number"
                name="phone"
                value={data.phone}
                onChange={(v) => update('phone', v)}
                placeholder="+91 98765 43210"
                required
                error={errors.phone}
              />

              <SelectInput
                label="What best describes your business?"
                name="businessType"
                value={data.businessType}
                onChange={(v) => update('businessType', v)}
                options={businessTypes}
                required
                error={errors.businessType}
                placeholder="Select your business type"
              />

              <CheckboxGroup
                label="What type of beauty or personal-care products do you manufacture or develop?"
                name="products"
                values={data.products}
                options={productOptions}
                onChange={(v) => update('products', v)}
                required
                error={errors.products}
              />

              <CheckboxGroup
                label="Which types of ingredients are you interested in sourcing?"
                name="ingredients"
                values={data.ingredients}
                options={ingredientOptions}
                onChange={(v) => update('ingredients', v)}
                required
                error={errors.ingredients}
              />

              <SelectInput
                label="Approximate ingredient requirement"
                name="requirement"
                value={data.requirement}
                onChange={(v) => update('requirement', v)}
                options={requirementOptions}
                required
                error={errors.requirement}
                placeholder="Select your requirement"
              />

              <TextInput
                label="Business / Delivery Location"
                name="location"
                value={data.location}
                onChange={(v) => update('location', v)}
                placeholder="City, State, Country"
                required
                error={errors.location}
              />

              <TextArea
                label="Tell us about your requirements"
                name="additionalRequirements"
                value={data.additionalRequirements}
                onChange={(v) => update('additionalRequirements', v)}
                placeholder="Share details about your ingredient needs, formulation projects, or any specific requirements..."
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
      </section>
    </div>
  );
}
