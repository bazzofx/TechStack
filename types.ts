export interface TechDetails {
  KnownRisk?: string;
  ConfigFiles?: string[];
  Variables?: string[];
  CommonDirectories?: string[];
  LogFiles?: string[];
  BackupFiles?: string[];
  ExposedEndpoints?: string[];
  EnvironmentVariables?: string[];
  DebugModes?: string[];
  CommonVulnerabilities?: string[];
  DefaultCredentials?: string[];
  UsefulTools?: string[];
  [key: string]: string | string[] | undefined; // Fallback for flexibility
}

export interface TechCategory {
  [techName: string]: TechDetails;
}

export interface AppData {
  [categoryName: string]: TechCategory;
}

export interface SearchResult {
  category: string;
  techName: string;
  matchField: string;
  matchValue: string;
}