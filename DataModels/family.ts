import { Schema, model, Document, Model } from 'mongoose';
import { User } from './user';

export interface IUser_UserChat extends User {
    _id: string;
    name: string;
}
export interface IFamily extends Document {
    name:string,
    relation: string;
    user: IUser_UserChat;
    datecreated: Date;
    datemodified: Date;
}

export interface FamilyModel extends Model<IFamily> { };
export class Family {

    private _model: Model<IFamily>;

    constructor() {
        const schema = new Schema({
            name:{ type: String, required: true },
            relation: { type: String, required: true },
            datecreated: { type: Date, required: true },
            datemodified: { type: Date, required: true },
            user: {
                _id: { type: Schema.Types.ObjectId, ref: "users" },
                name: { type: String }
            }
        });
        this._model = model<IFamily>('family', schema);
    }

    public get model(): Model<IFamily> {
        return this._model
    }
}
