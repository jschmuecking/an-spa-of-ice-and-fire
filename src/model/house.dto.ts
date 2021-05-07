import { ResourceURL } from "./types";

export interface HouseDto {
  url: ResourceURL;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: ResourceURL;
  heir: ResourceURL;
  overlord: ResourceURL;
  founded: string;
  founder: ResourceURL;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: ResourceURL[];
  swornMembers: ResourceURL[];
}
