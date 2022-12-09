// export interface monthValues {
//   january: number | null;
//   february: number | null;
//   march: number | null;
//   april: number | null;
//   may: number | null;
//   june: number | null;
//   july: number | null;
//   august: number | null;
//   september: number | null;
//   october: number | null;
//   november: number | null;
//   december: number | null;
// }

export type monthValues = Record<monthType, number | null>;

export type monthType = 
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';