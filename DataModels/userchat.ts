import { Schema, model, Document, Model } from 'mongoose';
import { User } from './user';

declare interface IUser_UserChat extends User{
    _id:string,
    name:string,
    icon:string
}

declare interface IUserChat extends Document{
    message: string;
    user:IUser_UserChat;
    datecreated: Date;
    datemodified: Date;
}

export interface UserChatModel extends Model<IUserChat> {};
export class UserChat {

    private _model: Model<IUserChat>;

    constructor() {
        const schema =  new Schema({
            message: { type: String, required: true },
            user:{
                _id:{type:Schema.Types.ObjectId,ref:"users"},
                name:{type:Schema.Types.String},
                icon:{type:Schema.Types.String},
            },
            datecreated: { type: Date, required: true },
            datemodified: { type: Date, required:true }
        });
        this._model = model<IUserChat>('userchats', schema);
    }

    public get model(): Model<IUserChat> {
        return this._model
    }
}
