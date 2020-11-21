import { Schema, model, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    phone: string;
    age: number;
    icon?: string;
    datecreated: Date;
    datemodified: Date;
    address: string;
    latitude: number;
    longitude: number;
    birthdate?: Date;
}

export interface UserModel extends Model<IUser> { };
export class User {

    private _model: Model<IUser>;

    constructor() {
        const schema = new Schema({
            name: { type: String, required: true },
            phone: { type: String, requiredPaths: true },
            age: { type: Number, required: true },
            icon: { type: String, required: false },
            datecreated: { type: Date, required: true },
            datemodified: { type: Date, required: true },
            birthdate: { type: Date, required: false },
            address: { type: String, required: false },
            latitude: { type: Number, required: false },
            longitude: { type: Number, required: false }
        });
        this._model = model<IUser>('users', schema);
    }

    public get model(): Model<IUser> {
        return this._model
    }
}
