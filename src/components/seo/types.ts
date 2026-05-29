/** Single FAQ pair for FAQPage structured data. */
export type FAQSchemaItem = {
  question: string;
  answer: string;
};

/** One step in a HowTo guide. */
export type HowToSchemaStep = {
  name: string;
  text: string;
  /** Optional absolute image URL for the step. */
  image?: string;
  /** ISO 8601 duration, e.g. PT15M */
  duration?: string;
};

/** One crumb in BreadcrumbList — `href` is a site path or absolute URL. */
export type BreadcrumbSchemaItem = {
  name: string;
  href: string;
};

export type OrganizationSchemaOverrides = {
  name?: string;
  description?: string;
  logoUrl?: string;
  imageUrl?: string;
};
