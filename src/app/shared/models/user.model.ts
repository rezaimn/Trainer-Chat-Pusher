export class UserModel {
  id: string;
  name: string;
  avatar_url: string;
  roomId: any;
  selected:boolean;
  constructor(data: any = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.avatar_url = data.avatar_url || '';
    this.roomId = data.roomId;
    this.selected=data.selected||false;
  }
}
