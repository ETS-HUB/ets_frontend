export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ETS Hub",
    alternateName: "Empowering Tech Students Hub",
    url: "https://etshub.org",
    logo: "https://etshub.org/logo.png",
    description:
      "A vibrant community of students, creators, and tech enthusiasts passionate about innovation, learning, and building the future of technology together.",
    foundingDate: "2020",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@etshub.org",
    },
    sameAs: [
      "https://twitter.com/etshub",
      "https://instagram.com/etshub",
      "https://linkedin.com/company/etshub",
      "https://github.com/etshub",
    ],
    keywords:
      "tech community, student tech organization, innovation, technology events, hackathons, student developers",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ETS Hub",
    url: "https://etshub.org",
    description:
      "Join ETS Hub, a vibrant community of students, creators, and tech enthusiasts passionate about innovation.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://etshub.org/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventSchema({ event }: { event: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.event_date,
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: event.image_url,
    organizer: {
      "@type": "Organization",
      name: "ETS Hub",
      url: "https://etshub.org",
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema({ person }: { person: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: person.image,
    worksFor: {
      "@type": "Organization",
      name: "ETS Hub",
    },
    sameAs: [
      person.twitter,
      person.linkedin,
      person.github,
      person.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
