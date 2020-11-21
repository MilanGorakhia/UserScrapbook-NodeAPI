export class  getallusersModel {

    id:string | undefined;
    name:string | undefined;
    age:number | undefined;
    icon:string | undefined;
    nooffamilymember: number | undefined;
    address: number | undefined;
}

export class ManageuserModel {
    id: string;
    name: string;
    age: number;
    icon: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
    birthdate?: string;

    constructor() {

        this.age = 0;
        this.icon = "";
        this.phone = "";
        this.name = "";
        this.id = "";
        this.address = "";
        this.latitude = 0;
        this.longitude = 0;
        this.birthdate = "";
    }
};


export class GetUserDetailModel_request {
    id: string;
    constructor() {
        this.id = "";
    }
};


export class ManageFamilyModel_Request {
    id: string;
    name: string;
    relation: string;
    userid: string;
    username: string;
    constructor() {

        this.relation = "";
        this.username = "";
        this.userid = "";
        this.name = "";
        this.id = "";
    }
};

export class getfamilylist_Model{

    id: string;
    name: string;
    relation: string;
    userid: string;
    username: string;
    constructor() {
        this.relation = "";
        this.username = "";
        this.userid = "";
        this.name = "";
        this.id = "";
    }
}

export class getusertasklist_Model {

    id: string;
    task: string;
    userid: string;
    username: string;
    datemodified: string;
    constructor() {
        this.username = "";
        this.userid = "";
        this.task = "";
        this.id = "";
        this.datemodified = "";
    }
}

export class addusertask_Model {

    id: string;
    userid: string;
    username: string;
    task: string;

    constructor() {

        this.id = "";
        this.userid = "";
        this.task = "";
        this.username = "";
    }
}