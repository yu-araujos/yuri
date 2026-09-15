import type { ContributionDay } from "@/types/github";

export async function getContributions(
  username: string,
): Promise<ContributionDay[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.contributions ?? [];
  } catch {
    return [];
  }
}
