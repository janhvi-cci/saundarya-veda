import { getIngredientBySlug, ingredients, type Ingredient } from './ingredients';

export interface ChatbotAction {
  label: string;
  to: string;
}

export interface ChatbotResponse {
  text: string;
  actions?: ChatbotAction[];
}

export const chatbotSuggestions = [
  'Explore ingredients',
  'Which ingredients are good for skincare?',
  'Which ingredients are useful for haircare?',
  'Tell me about Hyaluronic Acid',
  'What ingredients are good for dry skin?',
  'How can I request a sample?',
  'How can I request a quote?',
  'How can I become a B2B partner?',
  'What applications do you serve?',
  'How can I contact Saundarya Veda?',
];

const actions = {
  ingredients: { label: 'View All Ingredients', to: '/ingredients' },
  quote: { label: 'Request a Quote', to: '/request-quote' },
  sample: { label: 'Request a Sample', to: '/request-sample' },
  partner: { label: 'Become a Partner', to: '/become-a-partner' },
  contact: { label: 'Contact Us', to: '/contact' },
  about: { label: 'About Saundarya Veda', to: '/about' },
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function ingredientResponse(ingredient: Ingredient): ChatbotResponse {
  return {
    text: `${ingredient.name} is ${ingredient.detail.overview}\n\nCommon applications:\n${ingredient.detail.productFormats.map((format) => `• ${format}`).join('\n')}\n\nWhy formulators use it:\n${ingredient.detail.whyUsed}\n\nKey benefits:\n${ingredient.detail.benefits.map((benefit) => `• ${benefit}`).join('\n')}`,
    actions: [
      { label: `Explore ${ingredient.name}`, to: `/ingredients/${ingredient.slug}` },
      { label: 'Request a Quote', to: `/request-quote?ingredient=${encodeURIComponent(ingredient.name)}` },
    ],
  };
}

export function getChatbotResponse(question: string): ChatbotResponse {
  const value = normalize(question);

  if (!value) return { text: 'Please share an ingredient or formulation question and I will help you explore the Saundarya Veda catalogue.' };

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(value)) {
    return { text: "Hello! 🌸 Welcome to Saundarya Veda.\n\nI'm here to help you explore beauty and cosmetic ingredients, formulation applications, samples, quotes and B2B enquiries.\n\nWhat would you like to know?", actions: [actions.ingredients, actions.contact] };
  }

  const matchedIngredient = ingredients.find((ingredient) => {
    const name = normalize(ingredient.name);
    return value.includes(name) || value.includes(ingredient.slug.replace(/-/g, ' '));
  });
  if (matchedIngredient) return ingredientResponse(matchedIngredient);

  if (value.includes('explore') && value.includes('ingredient') || value === 'ingredients' || value.includes('catalogue')) {
    return { text: 'Explore our catalogue of botanical extracts, cosmetic actives, hydration ingredients, oils and butters. You can filter by category or application to find a suitable starting point for your formulation.', actions: [actions.ingredients, actions.sample] };
  }

  if (value.includes('skincare') || value.includes('skin care')) {
    const names = ingredients.filter((ingredient) => ingredient.applications.includes('Skincare')).map((ingredient) => ingredient.name);
    return { text: `Our skincare catalogue includes:\n${names.map((name) => `• ${name}`).join('\n')}\n\nThe best choice depends on your formula brief, format and desired sensory profile. Explore each ingredient for its cosmetic role and common applications.`, actions: [actions.ingredients, actions.quote] };
  }

  if (value.includes('haircare') || value.includes('hair care') || value.includes('hair')) {
    const names = ingredients.filter((ingredient) => ingredient.applications.includes('Haircare')).map((ingredient) => ingredient.name);
    return { text: `Ingredients commonly listed for haircare applications include:\n${names.map((name) => `• ${name}`).join('\n')}\n\nThey can be explored for shampoos, conditioners, hair oils and related personal-care formats.`, actions: [actions.ingredients, actions.sample] };
  }

  if (value.includes('body care') || value.includes('bodycare')) {
    const names = ingredients.filter((ingredient) => ingredient.applications.includes('Body Care')).map((ingredient) => ingredient.name);
    return { text: `Our body-care applications include lotions, washes and other personal-care formats. Ingredients commonly listed for body care include:\n${names.map((name) => `• ${name}`).join('\n')}.`, actions: [actions.ingredients, actions.quote] };
  }

  if (value.includes('application') || value.includes('serve') || value.includes('product format') || value.includes('cosmetic')) {
    return { text: 'Saundarya Veda supports ingredient discovery for skincare, haircare, body care and cosmetics. Common formats include serums, creams, lotions, masks, shampoos, conditioners, hair oils, body washes and specialty formulations.', actions: [{ label: 'View Applications', to: '/applications' }, actions.ingredients] };
  }

  if (value.includes('dry skin')) {
    const names = ingredients.filter((ingredient) => ingredient.detail.skinTypes.includes('Dry skin')).map((ingredient) => ingredient.name);
    return { text: `For dry-skin formulation concepts, commonly considered ingredients include:\n${names.map((name) => `• ${name}`).join('\n')}\n\nThis is a formulation starting point rather than a universal suitability claim. Review the individual ingredient details and test the finished product appropriately.`, actions: [actions.ingredients, actions.quote] };
  }

  if (value.includes('sample')) return { text: 'You can use our sample and product enquiry flow to tell the Saundarya Veda team which ingredients, formats or documentation your business would like to evaluate.', actions: [actions.sample, actions.contact] };
  if (value.includes('quote') || value.includes('pricing') || value.includes('price')) return { text: 'For a quotation, share your business and ingredient requirements through the request form. The team can review your enquiry and follow up with the relevant information.', actions: [actions.quote, actions.ingredients] };
  if (value.includes('partner') || value.includes('registration') || value.includes('register')) return { text: 'Businesses can introduce their company, requirements and intended collaboration through our B2B partner enquiry form.', actions: [actions.partner, actions.contact] };
  if (value.includes('contact') || value.includes('reach') || value.includes('email')) return { text: 'Our contact flow is the right place for ingredient, sourcing, sample, documentation and B2B enquiries.', actions: [actions.contact, actions.quote] };
  if (value.includes('technical') || value.includes('document') || value.includes('specification') || value.includes('inci') || value.includes('moq')) return { text: "That's a useful formulation question. We don't currently publish that specification on our website. For the latest technical details, please contact our Saundarya Veda team.", actions: [actions.contact, actions.sample] };
  if (value.includes('what is saundarya') || value.includes('what do you offer') || value.includes('about saundarya') || value.includes('supply')) return { text: 'Saundarya Veda is a B2B beauty and cosmetic ingredient supplier for brands, manufacturers, formulators and personal-care businesses. The website supports ingredient discovery, samples, product information, quotations and partnership enquiries.', actions: [actions.about, actions.ingredients] };

  return { text: "I'm specially designed to help with Saundarya Veda and beauty & cosmetic ingredients 🌸\n\nI may not be the best assistant for that question, but I can help you explore our ingredients, applications, formulation-related information, samples, quotes and B2B enquiries.\n\nTry asking me:\n• 'Tell me about Hyaluronic Acid'\n• 'Which ingredients are used in haircare?'\n• 'How can I request a sample?'", actions: [actions.ingredients, actions.contact] };
}

export function getIngredientAction(slug: string) {
  return getIngredientBySlug(slug) ? `/ingredients/${slug}` : '/ingredients';
}