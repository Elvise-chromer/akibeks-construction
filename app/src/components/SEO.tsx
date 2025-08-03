import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Akibeks Construction Ltd - Premier Construction Company in Kenya",
  description = "Kenya's premier construction company delivering exceptional building solutions across residential, commercial, and industrial sectors.",
  keywords = "construction, building, Kenya, Nairobi, residential, commercial, industrial, Akibeks, engineering, construction company",
  author = "Akibeks Construction Ltd",
  canonical,
  ogType = "website",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.jpg",
  ogUrl,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage = "/og-image.jpg",
  structuredData,
  noIndex = false,
  noFollow = false
}) => {
  const baseUrl = "https://akibeks.co.ke";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgUrl = ogUrl ? `${baseUrl}${ogUrl}` : baseUrl;
  
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots Meta */}
      {noIndex && <meta name="robots" content="noindex" />}
      {noFollow && <meta name="robots" content="nofollow" />}
      {!noIndex && !noFollow && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="Akibeks Construction Ltd" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullOgUrl} />
      <meta property="twitter:title" content={finalTwitterTitle} />
      <meta property="twitter:description" content={finalTwitterDescription} />
      <meta property="twitter:image" content={`${baseUrl}${twitterImage}`} />
      <meta property="twitter:site" content="@akibeks" />
      <meta property="twitter:creator" content="@akibeks" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Akibeks Construction" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Akibeks Construction Ltd",
          "url": "https://akibeks.co.ke",
          "logo": "https://akibeks.co.ke/akibeks-logo.svg",
          "description": "Kenya's premier construction company delivering exceptional building solutions across residential, commercial, and industrial sectors.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kiambu Road, Nairobi",
            "addressLocality": "Nairobi",
            "addressRegion": "Nairobi",
            "postalCode": "00100",
            "addressCountry": "KE"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-700-123-456",
            "contactType": "customer service",
            "areaServed": "KE",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/akibeksconstruction",
            "https://www.linkedin.com/company/akibeks-construction",
            "https://twitter.com/akibeks"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;