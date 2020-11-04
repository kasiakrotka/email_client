

export class User {
    constructor(public email: string, public id: string, private _expireDate: string){

    }

    get expireDate() {
        return this._expireDate;
    }
}