import { ResourceURL } from "./types";

export interface HouseDto {
  url: ResourceURL; // The hypermedia URL of this resource
  name: string; // The name of this house
  region: string; // The region that this house resides in.
  coatOfArms: string; // Text describing the coat of arms of this house.
  words: string; // The words of this house.
  titles: string[]; // The titles that this house holds.
  seats: string[]; // The seats that this house holds.
  currentLord: ResourceURL; // The Character resource URL of this house's current lord.
  heir: ResourceURL; // The Character resource URL of this house's heir.
  overlord: ResourceURL; // The House resource URL that this house answers to.
  founded: string; // The year that this house was founded.
  founder: ResourceURL; // The Character resource URL that founded this house.
  diedOut: string; // The year that this house died out.
  ancestralWeapons: string[]; // An array of names of the noteworthy weapons that this house owns.
  cadetBranches: ResourceURL[]; // An array of House resource URLs that was founded from this house.
  swornMembers: ResourceURL[]; // An array of Character resource URLs that are sworn to this house.
}
