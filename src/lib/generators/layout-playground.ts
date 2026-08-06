export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type JustifyContent = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
export type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type GridAlign = "stretch" | "start" | "center" | "end";

export interface FlexConfig {
  direction: FlexDirection;
  justify: JustifyContent;
  align: AlignItems;
  wrap: FlexWrap;
  gap: number;
  itemCount: number;
}

export const defaultFlexConfig: FlexConfig = {
  direction: "row",
  justify: "flex-start",
  align: "stretch",
  wrap: "nowrap",
  gap: 12,
  itemCount: 5,
};

export const flexDirectionOptions: FlexDirection[] = ["row", "row-reverse", "column", "column-reverse"];
export const justifyContentOptions: JustifyContent[] = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];
export const alignItemsOptions: AlignItems[] = ["stretch", "flex-start", "center", "flex-end", "baseline"];
export const flexWrapOptions: FlexWrap[] = ["nowrap", "wrap", "wrap-reverse"];

export function buildFlexCss(config: FlexConfig): string {
  return [
    ".container {",
    "  display: flex;",
    `  flex-direction: ${config.direction};`,
    `  justify-content: ${config.justify};`,
    `  align-items: ${config.align};`,
    `  flex-wrap: ${config.wrap};`,
    `  gap: ${config.gap}px;`,
    "}",
  ].join("\n");
}

export interface GridConfig {
  columns: number;
  rows: number;
  gap: number;
  justifyItems: GridAlign;
  alignItems: GridAlign;
  itemCount: number;
}

export const defaultGridConfig: GridConfig = {
  columns: 3,
  rows: 2,
  gap: 12,
  justifyItems: "stretch",
  alignItems: "stretch",
  itemCount: 6,
};

export const gridAlignOptions: GridAlign[] = ["stretch", "start", "center", "end"];

export function buildGridCss(config: GridConfig): string {
  return [
    ".container {",
    "  display: grid;",
    `  grid-template-columns: repeat(${config.columns}, 1fr);`,
    `  grid-template-rows: repeat(${config.rows}, 1fr);`,
    `  gap: ${config.gap}px;`,
    `  justify-items: ${config.justifyItems};`,
    `  align-items: ${config.alignItems};`,
    "}",
  ].join("\n");
}

/** Deterministic, visually distinct preview color per item index — decorative only. */
export function previewColor(index: number): string {
  const hue = (index * 47) % 360;
  return `hsl(${hue} 70% 60%)`;
}
