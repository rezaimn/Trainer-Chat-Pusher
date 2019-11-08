import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {HttpService} from '../../shared/services/http.service';
import Chatkit from '@pusher/chatkit-client';
import {DataService} from '../../shared/services/data.service';
import {EventEmitterService} from '../../shared/services/event-emitter.service';
import {UserModel} from '../../shared/models/user.model';
import {UserMessageModel} from "../../shared/models/user-message.model";

/**
 * there are two sections in the template,
 * one is suppose to be displayed for admin and one for users,
 * at first we check if the logged in person is admin or not and the suitable data will be displayed for him.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId = '';
  allUsers: any[] = [];
  currentUser = <any>{};
  messages = [];
  userMessageArray: UserMessageModel[] = [];
  currentRoom = <any>{};
  roomUsers = [];
  userRooms = [];
  newMessage = '';
  newRoom = {
    name: 'test',
    isPrivate: false
  };
  joinableRooms = [];
  newUser = '';

  constructor(private httpService: HttpService,
              public dataService: DataService,
              private emitterService: EventEmitterService
  ) {
    this.emitterService.sentMessage.subscribe(
      (message => {
        this.newMessage = message;
        this.sendMessage();
      })
    )
    this.emitterService.selectedUserToChat.subscribe(
      (user => {
        for (let room of this.currentUser.rooms) {

          if (room.customData.user == user.id && room.customData.admin == this.currentUser.id) {
            this.currentRoom = room;

            this.messages = this.userMessageArray[this.userMessageArray.findIndex(obj => {
              return obj.roomId == room.id;
            })].messages;
            setTimeout(()=>{
              document.getElementById('messages-view').scrollTop = document.getElementById('messages-view').scrollHeight;
            },500);

            if(user.unreadCount>0){
              this.makeAsReadRoomMessages(room.id,this.messages[this.messages.length-1].id);
            }
            this.dataService.currentRoom = room;
          }
        }

      })
    )
  }

  ngOnInit(): void {
    this.connectAdminToServer();

  }

  addUserToRoom(user, room) {
    const {currentUser} = this;
    currentUser.addUserToRoom({
      userId: user,
      roomId: room.id
    })
      .then((currentRoom) => {

        this.roomUsers = currentRoom;

        //console.log( this.allUsers);
      })
      .catch(err => {
        console.log(`Error adding user: ${err}`);
      });

    this.newUser = '';
  }

  makeAsReadRoomMessages(roomId, messageId) {
    this.currentUser.setReadCursor({
      roomId: roomId,
      position: messageId
    })
      .then(() => {

      })
      .catch(err => {

      })
  }

  createRoom(user) {
    const {newRoom: {name, isPrivate}, currentUser} = this;


    currentUser.createRoom({
      name: user.id.toString(),
      private: isPrivate,
      addUserIds: [currentUser.id, user.id],
      customData: {admin: currentUser.id, user: user.id},
    }).then(room => {
      this.connectToRoom(room.id);
      this.addUserToRoom(user.id, room);
    })
      .catch(err => {
        console.log(`Error creating room ${err}`)
      })


  }

  getJoinableRooms() {
    const {currentUser} = this;
    this.currentUser.getJoinableRooms()
      .then(rooms => {
        this.joinableRooms = rooms;

      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`)
      })
  }

  deleteRoom(room) {
    const {currentUser,} = this;
    currentUser.deleteRoom({roomId: room.id})
      .then(() => {
        console.log(`Deleted room with ID: ${room.id}`)
      })
      .catch(err => {
        console.log(`Error deleted room ${room.id}: ${err}`)
      })
  }

  joinRoom(id) {
    const {currentUser} = this;
    currentUser.joinRoom({roomId: id})
      .catch(err => {
        console.log(`Error joining room ${id}: ${err}`)
      })
  }

  connectToRoom(id) {
    const {currentUser} = this;

    currentUser.subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          //console.log(message);
          this.userMessageArray[this.userMessageArray.findIndex(obj => {
            return obj.roomId == message.roomId;
          })].messages.push(message);
          let indexOfUser=this.dataService.allUsers.findIndex(user => {
            return user.id == message.senderId;
          });
          if(indexOfUser>=0){
            this.dataService.allUsers[indexOfUser].unreadCount=message.room.unreadCount;
          }
          if (message.roomId == this.currentRoom.id) {
            this.makeAsReadRoomMessages(message.roomId,message.id);
            document.getElementById('messages-view').scrollTop = document.getElementById('messages-view').scrollHeight;
          }
          //console.log( "cccccccccccccccccccccccc", message);
        },
        onPresenceChanged: (state, user) => {
          //console.log(state, "xxxxxxxxxxxxxxxx", user);
          let userStatus = {
            userId: user.id,
            current: state.current
          }
          this.emitterService.userStatusChanged.emit(userStatus);
        },
      },
    })
      .then(currentRoom => {
        // console.log(currentRoom,"yyyyyyyyyyyyyyyyyyyyyy");
        this.currentRoom = currentRoom;
        this.roomUsers = currentRoom.users;
        this.userRooms = currentUser.rooms;
      });
  }

  sendMessage() {

    document.getElementById('messages-view').scrollTop = document.getElementById('messages-view').scrollHeight;
    this.currentUser.sendMessage({
      text: this.newMessage,
      roomId: `${this.currentRoom.id}`,
    }).then(
      (res => {
        // let message={
        //   data:this.newMessage,
        //   userId:this.currentUser.id
        // }
        // this.messages.push(message);
      })
    );

  }

  getAllUsers() {
    this.httpService.get('users').subscribe(
      (users => {
        //console.log(users, "fffffffffffffffffffffffffffffffff");
        this.dataService.allUsers = users.filter(user => {
          return user.id != 'admin';
        });

        let roomIsAlreadyExist = false;
        for (let user of this.dataService.allUsers) {
          user.unreadCount=0;
          for (let room of this.currentUser.rooms) {
            if (room.customData.admin == this.currentUser.id && room.customData.user == user.id) {
              roomIsAlreadyExist = true;
              this.connectToRoom(room.id);
            }
          }
          if (!roomIsAlreadyExist) {
            this.createRoom(user);
          }
        }
      })
    )
  }

  connectAdminToServer() {
    const {userId} = this;
    const tokenProvider = new Chatkit.TokenProvider({
      url: 'http://165.227.1.12:88/api/v1/chat/getUser',
      queryParams: {
        "id": 'admin'
      }
    });
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:8bade3b6-820d-4ff2-94f0-14d32b8bcd8f',
      userId: 'admin',
      tokenProvider,
    });
    return chatManager.connect()
      .then(currentUser => {
        onPresenceChanged: (state, user) => {
          console.log(`User ${user.name} is ${state.current}`)
        }
        this.getAllUsers();
        this.currentUser = currentUser;
        for (let room of currentUser.rooms) {
          let userMessageT = {
            userId: room.customData.user,
            roomId: room.id,
            unreadCount: room.unreadCount,
            messages: []
          }
          this.userMessageArray.push(userMessageT);
        }
        this.dataService.currentUser = currentUser;
        // for(let room of currentUser.rooms){
        //   this.deleteRoom(room);
        // }
        console.log('Error on connection', currentUser)
      })
      .catch(err => {
        console.log('Error on connection', err)
      })
  }
}
