export interface notification {
  id: number;
  subject: string;
  message: string;
  link?: string;
  status: StatusNotification;
  updatedAt: Date;
  createdAt: Date;
}

enum StatusNotification {
  READ,
  UNREAD
}
