// Session
export type Session = {
  isLoading: boolean;
  sessionId: string;
  institutionId: number;
  institutionName: string;
  regionId: number;
  regionName: string;
  marketShareModel: number;
  customMarketShareOptionMap: { [key: number]: number };
  compareInstitutionIds: number[];
};

export type UpdateSessionParams = {
  sessionId?: string;
  institutionId?: number;
  institutionName?: string;
  regionId?: number;
  regionName?: string;
  marketShareModel?: number;
  customMarketShareOptionMap?: { [key: number]: number };
  compareInstitutionIds?: number[];
};

export type Prediction = {
  id: string;
  userId: string;
  name: string;
  probability: number;
  revisitOn: Date;
  isTrue: boolean | null;
  description: string;
  createdOn: Date;
  lastUpdated: Date;
};

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

export const defaultPrediction: Prediction = {
  id: "00000000-0000-0000-0000-000000000000",
  userId: "",
  name: "",
  probability: 0.5,
  revisitOn: nextWeek,
  isTrue: null,
  description: "",
  createdOn: new Date(),
  lastUpdated: new Date(),
};
