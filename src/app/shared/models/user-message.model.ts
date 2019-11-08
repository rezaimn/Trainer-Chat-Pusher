export class UserMessageModel {
  userId: string;
  roomId: string;
  unreadCount:number;
  messages:any[];
  constructor(data: any = {}) {
    this.userId = data.userId || '';
    this.roomId = data.roomId || '';
    this.unreadCount = data.unreadCount || 0;
    this.messages = data.messages ||[];
  }
}
