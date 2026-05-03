import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";
import { SITE_URL, type RouteSeo } from "@/lib/seo";

interface SEOProps {
  route: RouteSeo;
  jsonLd?: object | object[];
  children?: ReactNode;
}

export const SEO = ({ route, jsonLd, children }: SEOProps) => {
  const url = `${SITE_URL}${route.path === "*" ? "" : route.path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={route.title} />
      <meta property="og:description" content={route.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Petaron.ai" />
      {/* TODO: add og:image once a 1200x630 social card exists */}
      {/* <meta property="og:image" content={`${SITE_URL}/og-image.png`} /> */}
      {/* <meta property="og:image:width" content="1200" /> */}
      {/* <meta property="og:image:height" content="630" /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={route.title} />
      <meta name="twitter:description" content={route.description} />
      {/* <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} /> */}

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}

      {children}
    </Helmet>
  );
};
