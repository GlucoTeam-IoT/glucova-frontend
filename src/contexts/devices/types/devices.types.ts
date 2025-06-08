export interface Device {
  id: string;
  user_id: string;
  status: string;
  timestamp: string;
}

export type NewDeviceData = {
  timestamp: string;
};
