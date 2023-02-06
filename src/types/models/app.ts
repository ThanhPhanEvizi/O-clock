export interface DataTimeProps {
  key: string;
  presentTime: string;
  time: number;
  timeLoop: number;
}

export interface HistoryDataTimeProps {
  data: DataTimeProps[];
  time_start: string;
  time_end: string;
}
