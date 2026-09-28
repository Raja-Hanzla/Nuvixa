export type PodcastFormat = "mp3" | "aac" | "wav";
export type ChannelLayout = "mono" | "stereo";

export interface PodcastSizeInput {
  hours: number;
  minutes: number;
  seconds: number;
  channels: ChannelLayout;
  format: PodcastFormat;
  bitrateKbps: number;
  sampleRateHz: number;
  bitDepth: number;
  downloadsPerEpisode: number;
}

export interface PodcastSizeResult {
  totalSeconds: number;
  bytes: number;
  megabytes: number;
  perMinuteMb: number;
  monthlyBandwidthGb: number;
}

export interface BitratePreset {
  kbps: number;
  label: string;
}

export const bitratePresets: BitratePreset[] = [
  { kbps: 64, label: "64 kbps — small, fine for mono spoken word" },
  { kbps: 96, label: "96 kbps — good default for spoken-word podcasts" },
  { kbps: 128, label: "128 kbps — solid all-purpose quality" },
  { kbps: 160, label: "160 kbps — noticeably cleaner, bigger files" },
  { kbps: 192, label: "192 kbps — common for music-heavy episodes" },
  { kbps: 256, label: "256 kbps — high quality" },
  { kbps: 320, label: "320 kbps — maximum MP3 quality" },
];

export function estimatePodcastFileSize(input: PodcastSizeInput): PodcastSizeResult | null {
  const totalSeconds = input.hours * 3600 + input.minutes * 60 + input.seconds;
  if (totalSeconds <= 0) return null;

  let bytes: number;
  if (input.format === "wav") {
    const bytesPerSecondPerChannel = input.sampleRateHz * (input.bitDepth / 8);
    const channelMultiplier = input.channels === "mono" ? 1 : 2;
    bytes = bytesPerSecondPerChannel * channelMultiplier * totalSeconds;
  } else {
    bytes = ((input.bitrateKbps * 1000) / 8) * totalSeconds;
  }

  const megabytes = bytes / (1024 * 1024);
  const perMinuteMb = megabytes / (totalSeconds / 60);
  const monthlyBandwidthGb = (bytes * Math.max(0, input.downloadsPerEpisode)) / 1024 / 1024 / 1024;

  return { totalSeconds, bytes, megabytes, perMinuteMb, monthlyBandwidthGb };
}
