import { connect, connection, Connection } from 'mongoose';
import {UserModel,User} from './user';
import {Family,FamilyModel} from './family';
import {UserChat,UserChatModel} from './userchat';
import {UserTask,UserTaskModel} from './usertask';



declare interface IModels {
    User: UserModel,
    Family:FamilyModel,
    UserChat:UserChatModel,
    UserTask:UserTaskModel
}



export class DB {

    private static instance: DB;
    private _db: Connection; 
    private _models: IModels;

    private constructor() {
        connect("mongodb+srv://milan1312:jaygopal@cluster0.exaga.mongodb.net/UserScrapBook?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true });
        this._db = connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);

        this._models = {
            User: new User().model,
            Family: new Family().model,
            UserChat: new UserChat().model,
            UserTask:new UserTask().model
            // this is where we initialise all models
        }
    }

    public static get Models() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance._models;
    }

    private connected() {
        console.log('Mongoose has connected');
    }

    private error(error:any) {
        console.log('Mongoose has errored', error);
    }
}