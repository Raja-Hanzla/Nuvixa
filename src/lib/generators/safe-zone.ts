export type Platform = "tiktok" | "reels" | "shorts";

export interface SafeZoneConfig {
  label: string;
  /** Percent of frame blocked on each edge — rounded, illustrative approximations. */
  top: number;
  bottom: number;
  left: number;
  right: number;
  topLabel: string;
  bottomLabel: string;
  rightLabel: string;
}

export const safeZones: Record<Platform, SafeZoneConfig> = {
  tiktok: {
    label: "TikTok",
    top: 7,
    bottom: 20,
    left: 3,
    right: 15,
    topLabel: "Top nav (Search, Following / For You)",
    bottomLabel: "Caption, hashtags, sound title",
    rightLabel: "Profile, like, comment, share, bookmark",
  },
  reels: {
    label: "Instagram Reels",
    top: 8,
    bottom: 26,
    left: 3,
    right: 14,
    topLabel: "Top nav and camera icon",
    bottomLabel: "Caption, audio attribution, comment teaser",
    rightLabel: "Like, comment, share, remix, profile",
  },
  shorts: {
    label: "YouTube Shorts",
    top: 8,
    bottom: 17,
    left: 3,
    right: 13,
    topLabel: "Top nav",
    bottomLabel: "Title, channel name, subscribe button",
    rightLabel: "Like, dislike, comment, share, remix",
  },
};

export const platformOrder: Platform[] = ["tiktok", "reels", "shorts"];

/** The most conservative combined zone — the max blocked area across all three platforms on each edge. */
export function combinedSafeZone(): { top: number; bottom: number; left: number; right: number } {
  const all = Object.values(safeZones);
  return {
    top: Math.max(...all.map((z) => z.top)),
    bottom: Math.max(...all.map((z) => z.bottom)),
    left: Math.max(...all.map((z) => z.left)),
    right: Math.max(...all.map((z) => z.right)),
  };
}
