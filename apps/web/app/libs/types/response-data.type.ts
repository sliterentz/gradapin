export type TResponseData = {
    indicator: {
      id: string;
      value: string;
    };
    country: {
      id: string;
      value: string;
    };
    countryiso3code: string;
    date: string;
    value: number;
    unit: string;
    obs_status: string;
    decimal: number;
};

export type TBPSResponseData = {
  tahun: Array<{
    val: number;
    label: string;
  }>;
  datacontent: {
    [key: string]: number;
  }
}