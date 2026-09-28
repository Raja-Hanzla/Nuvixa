export type Platform = "twitch" | "youtube";
export type FrameRate = 30 | 60;

export interface ResolutionOption {
  id: string;
  label: string;
  width: number;
  height: number;
}

export const resolutionOptions: ResolutionOption[] = [
  { id: "1080p", label: "1080p", width: 1920, height: 1080 },
  { id: "900p", label: "900p", width: 1600, height: 900 },
  { id: "720p", label: "720p", width: 1280, height: 720 },
  { id: "480p", label: "480p", width: 854, height: 480 },
  { id: "360p", label: "360p", width: 640, height: 360 },
];

/**
 * Recommended video bitrates (kbps), based on Twitch's and YouTube Live's published broadcaster
 * guidelines. These are general-purpose defaults for a single non-partner-tier broadcast — always
 * double-check the platform's current help docs, since limits do shift over time.
 */
const BITRATE_TABLE: Record<Platform, Record<string, Record<FrameRate, number>>> = {
  twitch: {
    "1080p": { 30: 6000, 60: 6000 },
    "900p": { 30: 4500, 60: 5000 },
    "720p": { 30: 3500, 60: 4500 },
    "480p": { 30: 2000, 60: 2500 },
    "360p": { 30: 1000, 60: 1500 },
  },
  youtube: {
    "1080p": { 30: 4500, 60: 6750 },
    "900p": { 30: 3500, 60: 5000 },
    "720p": { 30: 2750, 60: 4000 },
    "480p": { 30: 1250, 60: 2000 },
    "360p": { 30: 700, 60: 1000 },
  },
};

export const AUDIO_BITRATE_KBPS = 160;

/** Keep total stream bitrate at or below this fraction of tested upload speed, to leave headroom for network overhead. */
const UPLOAD_HEADROOM_FACTOR = 0.8;

export interface BitrateMatrixResult {
  videoKbps: number;
  audioKbps: number;
  totalKbps: number;
  requiredUploadMbps: number;
  uploadIsSufficient: boolean;
  uploadMarginPercent: number;
  keyframeIntervalSeconds: number;
  rateControl: string;
  profile: string;
  recommendedPreset: string;
}

export function getBitrateRecommendation(
  platform: Platform,
  resolutionId: string,
  fps: FrameRate,
  uploadMbps: number
): BitrateMatrixResult | null {
  const table = BITRATE_TABLE[platform]?.[resolutionId];
  if (!table) return null;

  const videoKbps = table[fps];
  const audioKbps = AUDIO_BITRATE_KBPS;
  const totalKbps = videoKbps + audioKbps;
  const requiredUploadKbps = totalKbps / UPLOAD_HEADROOM_FACTOR;
  const requiredUploadMbps = requiredUploadKbps / 1000;

  const availableUploadKbps = Math.max(0, uploadMbps) * 1000;
  const uploadIsSufficient = availableUploadKbps >= requiredUploadKbps;
  const uploadMarginPercent = requiredUploadKbps > 0 ? ((availableUploadKbps - requiredUploadKbps) / requiredUploadKbps) * 100 : 0;

  return {
    videoKbps,
    audioKbps,
    totalKbps,
    requiredUploadMbps,
    uploadIsSufficient,
    uploadMarginPercent,
    keyframeIntervalSeconds: 2,
    rateControl: "CBR (Constant Bitrate)",
    profile: "High",
    recommendedPreset: fps === 60 ? "Quality / fast (NVENC) or veryfast (x264)" : "Quality / medium (NVENC) or fast (x264)",
  };
}
