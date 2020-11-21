import { Schema, model, Document, Model } from 'mongoose';
import { User } from './user';

declare interface IUser_UserTask extends User{
    _id:string,
    name:string,
    icon:string
}

declare interface IUserTask extends Document{
    task: string;
    user:IUser_UserTask;
    datecreated: Date;
    datemodified: Date;
}

export interface UserTaskModel extends Model<IUserTask> {};
export class UserTask {

    private _model: Model<IUserTask>;

    constructor() {
        const schema =  new Schema({
            task: { type: String, required: true },
            user:{
                _id:{type:Schema.Types.ObjectId,ref:"users"},
                name:{type:Schema.Types.String},
                icon:{type:Schema.Types.String},
            },
            datecreated: { type: Date, required: true },
            datemodified: { type: Date, required:true }
        });
        this._model = model<IUserTask>('usertasks', schema);
    }

    public get model(): Model<IUserTask> {
        return this._model
    }
}
