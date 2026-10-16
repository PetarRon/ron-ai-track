import type { ReactElement, ReactNode } from "react";

/*
 * The legal texts are written once (PrivacyBody, TermsBody) and drawn by the
 * pages at /privacy and /terms (src/pages/RelayPrivacy.tsx, RelayTerms.tsx),
 * and by the previous site's pages while those stay in the repo. A page brings
 * its own Section and the links that fit it.
 */

/** How a page draws one numbered section */
export type LegalSection = (props: { title: string; i: number; children: ReactNode }) => ReactElement;

/** Where the texts' own links point on that page */
export type LegalLinks = { contact: string; privacy: string };

export const PRIVACY_UPDATED = "April 2026";
export const TERMS_UPDATED = "March 2026";
