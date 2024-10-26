
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  changelogs: ChangeLogs[];
}

type ChangeLogs = {
  properyName: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
}