export interface ISavegameAttribute {
  id: string;
  name: string;
  description?: string;
  icon: string;
  isDetail: boolean;
  isToggleable: boolean;
  isReadOnly: boolean;
  calc: (attributes: any) => any;
  sortFunc?: (lhs: any, rhs: any, locale: string) => number;
  filterFunc?: (filter: string, value: any) => boolean;
}