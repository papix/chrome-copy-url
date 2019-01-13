export interface Option {
  decodeUrlEncode: boolean;
  queryFilter: QueryFilterOption;
}

export interface QueryFilterOption {
  autoDeleteKeys: string[];
}
