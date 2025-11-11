import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://etshub.org";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  let eventPages: MetadataRoute.Sitemap = [];
  try {
    const eventsRes = await fetch(`${baseUrl}/api/events`, {
      next: { revalidate: 3600 },
    });
    if (eventsRes.ok) {
      const events = await eventsRes.json();
      eventPages = events.map((event: any) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: new Date(event.updatedAt || event.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching events for sitemap:", error);
  }

  let teamPages: MetadataRoute.Sitemap = [];
  try {
    const teamRes = await fetch(`${baseUrl}/api/volunteers`, {
      next: { revalidate: 3600 },
    });
    if (teamRes.ok) {
      const volunteers = await teamRes.json();
      teamPages = volunteers.map((volunteer: any) => ({
        url: `${baseUrl}/team/${volunteer.id}`,
        lastModified: new Date(volunteer.updatedAt || volunteer.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching team members for sitemap:", error);
  }

  return [...staticPages, ...eventPages, ...teamPages];
}
