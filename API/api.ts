import express, { request } from 'express';
import { DB } from '../DataModels/DB';
import moment from 'moment';
import { displayPartsToString } from 'typescript';
import { IFamily, Family } from '../DataModels/family';
import {
    getallusersModel, ManageuserModel, GetUserDetailModel_request, getfamilylist_Model, getusertasklist_Model, addusertask_Model, ManageFamilyModel_Request
} from '../Models/AppModels'
import { UserModel, IUser, User } from '../DataModels/user';
import { UserTask } from '../DataModels/usertask';

var App = express.Router();
App.get('/', async (req: any, res: any, next: any) => {
    res.json("server is working");
});

export class Samplemodel {
    id: string;
    name: string;

    constructor() {
        this.id = "";
        this.name = "";
    }
}

// 1 => GetAllUser
App.post("/getallusers", async (req: any, res: any, next: any) => {

    let response: getallusersModel[] = [];
    var datas = await DB.Models.User.find({}).select('_id name phone age icon address').sort({ datemodified: 1 });
    var familyrecords = await DB.Models.Family.find().select('user._id');
    response = datas.map((x: any) => {
        let obj = new getallusersModel();
        obj.age = x.age;
        obj.icon = x.icon;
        obj.id = x._id;
        obj.name = x.name;
        obj.nooffamilymember = familyrecords.filter(z => z.user._id.toString() == x._id.toString()).length;
        obj.address = x.address;
        return obj;
    });
    res.json(response);
})


// 2 => ManageUser(add or update)
App.post("/manageuser", async (req: any, res: any, next: any) => {
    let model: ManageuserModel = req.body as ManageuserModel;
    console.log(JSON.stringify(model));
    if (model.id == undefined || model.id == null || model.id == "") {
        let data = new DB.Models.User();
        data.datemodified = new Date();
        data.datecreated = new Date();
        data.name = model.name;
        data.phone = model.phone;
        data.age = model.age;
        data.address = model.address;
        data.latitude = model.latitude;
        data.longitude = model.longitude;
        data.birthdate = moment(model.birthdate).toDate();
        data = await data.save();
        res.json(data);
    }
    else {
        let data = await DB.Models.User.findById(model.id);
        if (data != null) {
            console.log('check1');
            data.datecreated = new Date();
            data.name = model.name;
            data.phone = model.phone;
            data.age = model.age;
            data.address = model.address;
            data.latitude = model.latitude;
            data.longitude = model.longitude;
            data.birthdate = moment(model.birthdate).toDate();
            data = await data.save();
            res.json(data);
        }
        else {
            res.json("no record found");
        }
    }
});

// 2.1 => ManageUser(add or update)
App.post("/GetUserDetail", async (req: any, res: any, next: any) => {
    let request: GetUserDetailModel_request = req.body as GetUserDetailModel_request;
    console.log(JSON.stringify(request));
    let obj: IUser = await DB.Models.User.findById(request.id) as unknown as IUser;
    let response: ManageuserModel = new ManageuserModel();
    response.age = obj.age;
    //response.icon = obj.icon;
    response.id = obj.id;
    response.name = obj.name;
    response.phone = obj.phone;
    response.address = obj.address;
    response.latitude = obj.latitude;
    response.longitude = obj.longitude;
    response.birthdate = (obj.birthdate == null || obj.birthdate == undefined) ? "" : moment(obj.birthdate).format("MM/DD/YYYY");

    res.json(response);
});

App.post("/DeleteUser", async (req: any, res: any, next: any) => {
    let obj = await DB.Models.User.findByIdAndDelete(req.body.id) as unknown as IUser;
    res.json(obj);
});


// 3 => Manage Family 
App.post("/managefamily", async (req: any, res: any, next: any) => {

    if (req.body.id == undefined || req.body.id == null || req.body.id == "") {
        let data = new DB.Models.Family();
        data.datemodified = new Date();
        data.datecreated = new Date();
        data.name = req.body.name;
        data.relation = req.body.relation;
        data.user._id = req.body.userid;
        data.user.name = req.body.username;
        data = await data.save();
        res.json(data);
    }
    else {
        let data = await DB.Models.Family.findById(req.body.id);
        if (data != null) {
            data.datemodified = new Date();
            data.name = req.body.name;
            data.relation = req.body.relation;
            data = await data.save();
            res.json(data);
        }
        else {
            res.json("no record found");
        }

    }
});


// 4 => getfamilylist
App.post("/getfamilylist", async (req: any, res: any, next: any) => {
    var datas = await DB.Models.Family.find({ "user._id": req.body.id }).select('_id name user.name user._id relation datamodified');
    let response: getfamilylist_Model[] = [];
    response = datas.map(x => {

        let obj: getfamilylist_Model = new getfamilylist_Model();
        obj.id = x._id;
        obj.name = x.name;
        obj.relation = x.relation;
        obj.userid = x.user._id;
        obj.username = x.user.name;
        return obj;
    })
    res.json(response);
});


App.post("/getfamiltdetail", async (req: any, res: any, next: any) => {
    let data: IFamily = await DB.Models.Family.findById(req.body.id) as unknown as IFamily;
    let response: ManageFamilyModel_Request = new ManageFamilyModel_Request();

    response.id = data.id;
    response.name = data.name;
    response.relation = data.relation;
    response.userid = data.user._id;
    response.username = data.user.name;
    res.json(response);
});

App.post("/deletefamily", async (req: any, res: any, next: any) => {
    let response = await DB.Models.Family.findByIdAndDelete(req.body.id);
    res.json(response);
});


/// Task 

App.post("/getusertasklist", async (req: any, res: any, next: any) => {

    var datas = await DB.Models.UserTask.find({ "user._id": req.body.id }).select('_id user.name task datamodified').sort({ task: -1 });
    let response: getusertasklist_Model[] = [];
    response = datas.map(x => {

        let obj: getusertasklist_Model = new getusertasklist_Model();
        obj.id = x._id;
        obj.task = x.task;
        obj.userid = x.user._id;
        obj.username = x.user.name;
        obj.datemodified = moment(x.datemodified).format("MM/DD/YYYY hh:mm:ss");
        return obj;
    })
    res.json(response);
});

App.post("/addusertask", async (req: any, res: any, next: any) => {
    let model: addusertask_Model = req.body as addusertask_Model;
    console.log(JSON.stringify(model));
    let obj = new DB.Models.UserTask();
    obj.task = model.task;
    obj.user._id = model.userid;
    obj.user.name = model.username;
    obj.datemodified = new Date();
    obj.datecreated = new Date();
    obj = await obj.save();
    res.json(obj);
});


App.post("/deleteusertask", async (req: any, res: any, next: any) => {
    let obj = await DB.Models.UserTask.findByIdAndDelete(req.body.id);
    res.json(obj);
});

export default App;