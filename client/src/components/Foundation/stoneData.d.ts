/**
 * Type declarations for stoneData.js
 */

export interface StoneColor {
  primary: string;
  light: string;
  dark: string;
}

export interface StoneGradient {
  from: string;
  to: string;
}

export interface StoneDetailColor {
  primary: string;
  secondary: string;
}

export interface StoneSetColors {
  [key: number]: {
    [key: number]: StoneDetailColor;
  };
}

export interface StoneColorMap {
  [key: number]: StoneColor;
  sets: {
    [key: number]: {
      [key: number]: StoneDetailColor;
    };
  };
}

export type StoneContent = string[];
export type StoneSet = StoneContent[];

// Stone sets by center (Head, Heart, Body)
export const STONE_SETS: StoneSet[];

// Color schemes for stones
export const STONE_COLORS: StoneColorMap;

// Helper function to get stone color based on set index
export function getStoneColorBySetIndex(setIndex: number): StoneColor;

// Helper function to get center name from set index
export function getCenterNameBySetIndex(setIndex: number): string;

// Get detailed color for specific stone
export function getStoneGradient(setIndex: number, stoneIndex: number): StoneGradient;

// Get a flat array of all stone content
export function getAllStoneContent(): Array<{
  id: string;
  content: string[];
  setIndex: number;
  stoneIndex: number;
  center: string;
}>;