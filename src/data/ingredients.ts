export interface Ingredient {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  applications: string[];
  image: string;
  available: boolean;
  commonName: string;
  inciName: string;
  form: string;
  origin: string;
  recommendedUsage: string;
  packaging: string;
  moq: string;
  detail: IngredientDetail;
}

export interface IngredientDetail {
  overview: string;
  whyUsed: string;
  benefits: string[];
  skinTypes: string[];
  howUsed: string;
  productFormats: string[];
  considerations: string;
  relatedSlugs: string[];
}

export const CATEGORIES = [
  'Natural & Botanical Extracts',
  'Cosmetic Actives',
  'Hydration & Moisturizing Ingredients',
  'Oils & Butters',
] as const;

export const CATEGORY_SLUGS: Record<string, string> = {
  'Natural & Botanical Extracts': 'natural-botanical-extracts',
  'Cosmetic Actives': 'cosmetic-actives',
  'Hydration & Moisturizing Ingredients': 'hydration-moisturizing-ingredients',
  'Oils & Butters': 'oils-butters',
};

export const APPLICATIONS = [
  {
    name: 'Skincare',
    items: ['Serums', 'Creams', 'Lotions', 'Masks'],
    icon: 'Sparkles',
    image: 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Ingredients for serums, creams, lotions and masks.',
  },
  {
    name: 'Haircare',
    items: ['Shampoos', 'Conditioners', 'Hair Oils', 'Hair Masks'],
    icon: 'Wind',
    image: 'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Ingredients for shampoos, conditioners, hair oils and masks.',
  },
  {
    name: 'Body Care',
    items: ['Body Lotions', 'Body Scrubs', 'Body Washes'],
    icon: 'Droplet',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Ingredients for body lotions, scrubs and washes.',
  },
  {
    name: 'Cosmetics',
    items: ['Makeup', 'Lip Care', 'Specialty Formulations'],
    icon: 'Flower2',
    image: 'https://images.pexels.com/photos/5069408/pexels-photo-5069408.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Ingredients for makeup, lip care and specialty formulations.',
  },
];

const INFO_ON_REQUEST = 'Information available on request';

const baseIngredients: Omit<Ingredient, 'detail'>[] = [
  {
    id: 1,
    slug: 'aloe-vera',
    name: 'Aloe Vera',
    category: 'Natural & Botanical Extracts',
    description:
      'Versatile botanical ingredient commonly used in soothing and hydrating personal-care formulations.',
    applications: ['Skincare', 'Haircare', 'Body Care'],
    image: 'https://images.pexels.com/photos/7408838/pexels-photo-7408838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Aloe Vera',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 2,
    slug: 'glycerin',
    name: 'Glycerin',
    category: 'Hydration & Moisturizing Ingredients',
    description:
      'Widely used humectant that helps attract and retain moisture in cosmetic formulations.',
    applications: ['Skincare', 'Haircare', 'Body Care'],
    image: 'https://images.pexels.com/photos/4841353/pexels-photo-4841353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Glycerin',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 3,
    slug: 'vitamin-e',
    name: 'Vitamin E',
    category: 'Cosmetic Actives',
    description:
      'Commonly used cosmetic ingredient valued for antioxidant and conditioning properties.',
    applications: ['Skincare', 'Haircare', 'Body Care'],
    image: 'https://images.pexels.com/photos/26733175/pexels-photo-26733175.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Vitamin E',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 4,
    slug: 'shea-butter',
    name: 'Shea Butter',
    category: 'Oils & Butters',
    description:
      'Rich plant-derived butter commonly used in moisturizing and nourishing formulations.',
    applications: ['Skincare', 'Body Care', 'Haircare'],
    image: 'https://images.pexels.com/photos/4735913/pexels-photo-4735913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Shea Butter',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 5,
    slug: 'coconut-oil',
    name: 'Coconut Oil',
    category: 'Oils & Butters',
    description:
      'Versatile natural oil commonly used in conditioning and moisturizing personal-care formulations.',
    applications: ['Haircare', 'Skincare', 'Body Care'],
    image: 'https://images.pexels.com/photos/9131994/pexels-photo-9131994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Coconut Oil',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 6,
    slug: 'jojoba-oil',
    name: 'Jojoba Oil',
    category: 'Oils & Butters',
    description:
      'Lightweight botanical oil commonly used for skin and hair conditioning.',
    applications: ['Skincare', 'Haircare', 'Body Care'],
    image: 'https://images.pexels.com/photos/7796318/pexels-photo-7796318.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Jojoba Oil',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 7,
    slug: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    category: 'Hydration & Moisturizing Ingredients',
    description:
      'Popular hydration-focused cosmetic ingredient used in modern skincare formulations.',
    applications: ['Skincare', 'Serums', 'Creams'],
    image: 'https://images.pexels.com/photos/19724463/pexels-photo-19724463.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Hyaluronic Acid',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 8,
    slug: 'niacinamide',
    name: 'Niacinamide',
    category: 'Cosmetic Actives',
    description:
      'Widely used cosmetic active ingredient in modern skincare formulations.',
    applications: ['Skincare', 'Serums', 'Creams'],
    image: 'https://images.pexels.com/photos/14479626/pexels-photo-14479626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Niacinamide',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 9,
    slug: 'vitamin-c',
    name: 'Vitamin C',
    category: 'Cosmetic Actives',
    description:
      'Popular cosmetic active commonly used in brightening and antioxidant-focused formulations.',
    applications: ['Skincare', 'Serums', 'Creams'],
    image: 'https://images.pexels.com/photos/5069408/pexels-photo-5069408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Vitamin C',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 10,
    slug: 'rose-extract',
    name: 'Rose Extract',
    category: 'Natural & Botanical Extracts',
    description:
      'Botanical ingredient commonly used in beauty and personal-care formulations.',
    applications: ['Skincare', 'Haircare', 'Body Care'],
    image: 'https://images.pexels.com/photos/6678406/pexels-photo-6678406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Rose Extract',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 11,
    slug: 'green-tea-extract',
    name: 'Green Tea Extract',
    category: 'Natural & Botanical Extracts',
    description:
      'Botanical extract commonly used in antioxidant-positioned beauty formulations.',
    applications: ['Skincare', 'Haircare'],
    image: 'https://images.pexels.com/photos/8330328/pexels-photo-8330328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Green Tea Extract',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
  {
    id: 12,
    slug: 'turmeric-extract',
    name: 'Turmeric Extract',
    category: 'Natural & Botanical Extracts',
    description:
      'Botanical ingredient commonly used in natural and traditional beauty formulations.',
    applications: ['Skincare', 'Body Care'],
    image: 'https://images.pexels.com/photos/17380335/pexels-photo-17380335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    commonName: 'Turmeric Extract',
    inciName: INFO_ON_REQUEST,
    form: INFO_ON_REQUEST,
    origin: INFO_ON_REQUEST,
    recommendedUsage: INFO_ON_REQUEST,
    packaging: INFO_ON_REQUEST,
    moq: INFO_ON_REQUEST,
  },
];

const ingredientDetails: Record<string, IngredientDetail> = {
  'aloe-vera': {
    overview: 'A botanical ingredient commonly selected for its lightweight, soothing and hydrating role in personal-care formulations.',
    whyUsed: 'Formulators often include Aloe Vera to add a fresh sensory profile and support hydration-focused, soothing-positioned products.',
    benefits: ['Hydration support', 'Soothing sensory profile', 'Suitable for lightweight formats'],
    skinTypes: ['Normal skin', 'Dry skin', 'Sensitive skin', 'Combination skin'],
    howUsed: 'It is commonly incorporated into water-based skincare, haircare and body-care systems according to the ingredient format and current technical documentation.',
    productFormats: ['Serums', 'Gel creams', 'Lotions', 'Masks', 'Shampoos', 'Body washes'],
    considerations: 'Some individuals may experience sensitivity depending on the ingredient format and formulation. Patch testing and appropriate formulation testing are recommended.',
    relatedSlugs: ['rose-extract', 'green-tea-extract', 'glycerin'],
  },
  glycerin: {
    overview: 'A widely used humectant that helps attract and retain moisture within cosmetic formulations.',
    whyUsed: 'Glycerin is commonly selected to support a moisturised skin feel and improve the sensory profile of hydration-focused products.',
    benefits: ['Humectant moisturising support', 'Smooth skin feel', 'Versatile across product formats'],
    skinTypes: ['Dry skin', 'Normal skin', 'Combination skin', 'Sensitive skin'],
    howUsed: 'Formulators may use it in the water phase of skincare, haircare and body-care products, with final use guided by the product brief and technical documentation.',
    productFormats: ['Serums', 'Creams', 'Lotions', 'Cleansers', 'Shampoos', 'Body washes'],
    considerations: 'The finished product should be assessed for skin feel, compatibility and overall formula balance. Ingredient-specific safety and regulatory details should be confirmed against current technical documentation.',
    relatedSlugs: ['hyaluronic-acid', 'aloe-vera', 'shea-butter'],
  },
  'vitamin-e': {
    overview: 'A commonly used cosmetic ingredient valued for antioxidant-positioned and conditioning roles in beauty formulations.',
    whyUsed: 'Formulators often select Vitamin E for nourishing product concepts and to complement antioxidant-focused skincare and haircare systems.',
    benefits: ['Conditioning support', 'Nourishing sensory profile', 'Useful in oil-based systems'],
    skinTypes: ['Dry skin', 'Normal skin', 'Combination skin'],
    howUsed: 'It is commonly included in oil phases, blends and finished personal-care formats according to the supplied form and technical guidance.',
    productFormats: ['Facial oils', 'Creams', 'Body lotions', 'Hair oils', 'Lip care'],
    considerations: 'Suitability depends on the individual, concentration and complete formulation. Patch testing and appropriate formulation testing are recommended.',
    relatedSlugs: ['jojoba-oil', 'coconut-oil', 'vitamin-c'],
  },
  'shea-butter': {
    overview: 'A rich plant-derived butter commonly used to bring emollience and a nourishing feel to personal-care products.',
    whyUsed: 'Shea Butter is often chosen to add richness, cushion and moisturising support to anhydrous and emulsion-based formats.',
    benefits: ['Emollient skin feel', 'Rich texture contribution', 'Nourishing product profile'],
    skinTypes: ['Dry skin', 'Normal skin'],
    howUsed: 'It is commonly incorporated into the oil phase or blended into balms, creams and conditioning products after considering texture and formula compatibility.',
    productFormats: ['Body butters', 'Creams', 'Balms', 'Body lotions', 'Hair masks', 'Conditioners'],
    considerations: 'The rich texture may not suit every product brief or skin preference. Formulators should confirm compatibility, stability and ingredient-specific documentation.',
    relatedSlugs: ['coconut-oil', 'jojoba-oil', 'glycerin'],
  },
  'coconut-oil': {
    overview: 'A versatile botanical oil commonly used for conditioning and moisturising roles in personal-care formulations.',
    whyUsed: 'Coconut Oil can contribute a familiar botanical positioning, emollient feel and richness to oil-based and rinse-off products.',
    benefits: ['Emollient conditioning', 'Rich sensory profile', 'Useful in hair and body formats'],
    skinTypes: ['Normal skin', 'Dry skin'],
    howUsed: 'It is commonly used in oil phases, blends and anhydrous products, with the final format guiding the appropriate formulation approach.',
    productFormats: ['Hair oils', 'Conditioners', 'Body oils', 'Balms', 'Body lotions', 'Cleansing products'],
    considerations: 'Individual preferences and sensitivity can vary. Patch testing, compatibility checks and appropriate formulation testing are recommended.',
    relatedSlugs: ['jojoba-oil', 'shea-butter', 'vitamin-e'],
  },
  'jojoba-oil': {
    overview: 'A lightweight botanical oil commonly used to provide skin and hair conditioning with a refined, non-heavy sensory profile.',
    whyUsed: 'Formulators often select Jojoba Oil for facial oils, haircare and body-care products where a smooth, elegant finish is desired.',
    benefits: ['Lightweight conditioning', 'Smooth sensory profile', 'Versatile across skin and haircare'],
    skinTypes: ['Normal skin', 'Dry skin', 'Combination skin'],
    howUsed: 'It is commonly used in oil phases, blends and leave-on formats, subject to the formula design and current technical documentation.',
    productFormats: ['Facial oils', 'Moisturisers', 'Hair oils', 'Conditioners', 'Body oils'],
    considerations: 'Finished product suitability depends on the complete formulation and individual sensitivity. Patch testing and formulation testing are recommended.',
    relatedSlugs: ['coconut-oil', 'vitamin-e', 'shea-butter'],
  },
  'hyaluronic-acid': {
    overview: 'A hydration-focused cosmetic ingredient commonly used in modern skincare, particularly in water-based formats.',
    whyUsed: 'Hyaluronic Acid is often selected to support a hydrated skin feel and a fresh, serum-like product experience.',
    benefits: ['Hydration support', 'Fresh skin feel', 'Well suited to water-based concepts'],
    skinTypes: ['Dry skin', 'Normal skin', 'Combination skin', 'Sensitive skin'],
    howUsed: 'It is commonly incorporated into serums, gels and creams according to its supplied form, processing needs and technical documentation.',
    productFormats: ['Serums', 'Gel creams', 'Moisturisers', 'Masks', 'Eye-care formats'],
    considerations: 'The supplied grade and formulation system affect processing and sensory performance. Confirm current technical and regulatory information before development.',
    relatedSlugs: ['glycerin', 'aloe-vera', 'niacinamide'],
  },
  niacinamide: {
    overview: 'A widely used cosmetic active selected for modern skincare and formulation concepts.',
    whyUsed: 'Formulators commonly include Niacinamide in balanced skincare systems designed around a refined, functional active profile.',
    benefits: ['Functional active positioning', 'Versatile in skincare systems', 'Suitable for a range of textures'],
    skinTypes: ['Normal skin', 'Combination skin', 'Oily skin'],
    howUsed: 'It is commonly incorporated into water-based skincare formats with attention to the complete formula, processing and technical documentation.',
    productFormats: ['Serums', 'Creams', 'Lotions', 'Masks', 'Cleansers'],
    considerations: 'Individual tolerance can vary by concentration and formula. Patch testing and appropriate formulation testing are recommended; confirm current technical guidance.',
    relatedSlugs: ['hyaluronic-acid', 'vitamin-c', 'green-tea-extract'],
  },
  'vitamin-c': {
    overview: 'A popular cosmetic active commonly used in brightening-positioned and antioxidant-focused skincare formulations.',
    whyUsed: 'Vitamin C is often selected for active-led product concepts and to complement broader antioxidant and radiance-focused positioning.',
    benefits: ['Antioxidant-focused positioning', 'Active skincare profile', 'Useful in serum and cream concepts'],
    skinTypes: ['Normal skin', 'Combination skin', 'Oily skin'],
    howUsed: 'It is incorporated according to the supplied form and formula requirements, with attention to processing, compatibility and current technical documentation.',
    productFormats: ['Serums', 'Creams', 'Lotions', 'Masks', 'Spot-care formats'],
    considerations: 'Some individuals may experience sensitivity. Formula stability, packaging and compatibility should be assessed by the formulator before launch.',
    relatedSlugs: ['niacinamide', 'vitamin-e', 'green-tea-extract'],
  },
  'rose-extract': {
    overview: 'A botanical extract commonly used to bring a floral, sensorial and nature-led character to beauty formulations.',
    whyUsed: 'Rose Extract is often included in products where botanical positioning and a gentle sensory story are important.',
    benefits: ['Botanical positioning', 'Sensory appeal', 'Suitable for personal-care concepts'],
    skinTypes: ['Normal skin', 'Dry skin', 'Sensitive skin'],
    howUsed: 'It is commonly used in water-based skincare, haircare and body-care products according to the extract format and technical guidance.',
    productFormats: ['Mists', 'Serums', 'Creams', 'Masks', 'Shampoos', 'Body lotions'],
    considerations: 'Botanical ingredients may not suit every individual. Patch testing and confirmation of current extract-specific documentation are recommended.',
    relatedSlugs: ['aloe-vera', 'green-tea-extract', 'turmeric-extract'],
  },
  'green-tea-extract': {
    overview: 'A botanical extract commonly selected for antioxidant-positioned beauty and personal-care formulations.',
    whyUsed: 'Formulators often use Green Tea Extract to support a fresh, botanical product story across skincare and haircare.',
    benefits: ['Botanical antioxidant positioning', 'Fresh product concept', 'Versatile in skincare and haircare'],
    skinTypes: ['Normal skin', 'Combination skin', 'Oily skin'],
    howUsed: 'It is commonly added to water-based and emulsion formats in line with the supplied extract form and technical documentation.',
    productFormats: ['Serums', 'Lotions', 'Masks', 'Shampoos', 'Scalp-care formats'],
    considerations: 'Individual sensitivity may vary. Confirm extract-specific safety, stability and regulatory details against current documentation.',
    relatedSlugs: ['rose-extract', 'vitamin-c', 'niacinamide'],
  },
  'turmeric-extract': {
    overview: 'A botanical ingredient commonly used in natural and traditional beauty formulation concepts.',
    whyUsed: 'Turmeric Extract can support a botanical product story and is often selected for skincare and body-care concepts.',
    benefits: ['Botanical positioning', 'Natural formulation story', 'Useful in skincare and body care'],
    skinTypes: ['Normal skin', 'Combination skin', 'Oily skin'],
    howUsed: 'It is commonly incorporated according to the extract format, desired sensory profile and current technical documentation.',
    productFormats: ['Masks', 'Creams', 'Lotions', 'Body washes', 'Body-care treatments'],
    considerations: 'Botanical extracts can vary in tolerance and sensory impact. Patch testing and appropriate formulation testing are recommended.',
    relatedSlugs: ['rose-extract', 'green-tea-extract', 'aloe-vera'],
  },
};

export const ingredients: Ingredient[] = baseIngredients.map((ingredient) => ({
  ...ingredient,
  detail: ingredientDetails[ingredient.slug],
}));

export function getIngredientBySlug(slug: string): Ingredient | undefined {
  return ingredients.find((i) => i.slug === slug);
}

export function getIngredientByName(name: string): Ingredient | undefined {
  return ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase());
}

export function getIngredientsByCategory(category: string): Ingredient[] {
  return ingredients.filter((i) => i.category === category);
}

export function getIngredientsByApplication(application: string): Ingredient[] {
  return ingredients.filter((i) => i.applications.includes(application));
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Natural & Botanical Extracts':
    'Botanical ingredients for beauty, personal-care and natural formulations.',
  'Cosmetic Actives':
    'Functional cosmetic ingredients used across modern skincare and personal-care formulations.',
  'Hydration & Moisturizing Ingredients':
    'Ingredients commonly used in hydration and moisturizing formulations.',
  'Oils & Butters':
    'Plant-derived oils and butters for skincare, haircare and body-care formulations.',
};

export const CATEGORY_IMAGES: Record<string, string> = {
  'Natural & Botanical Extracts':
    'https://images.pexels.com/photos/6678406/pexels-photo-6678406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Cosmetic Actives':
    'https://images.pexels.com/photos/14479626/pexels-photo-14479626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Hydration & Moisturizing Ingredients':
    'https://images.pexels.com/photos/4841353/pexels-photo-4841353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Oils & Butters':
    'https://images.pexels.com/photos/4735913/pexels-photo-4735913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};
