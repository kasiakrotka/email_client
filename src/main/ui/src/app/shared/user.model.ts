

export class User {

  address: String;
  Authorization: String;
  endDate: Date;
  startDate: Date;
  expirationDate: Date;

  constructor(token: String, address: String, startDate: String, endDate: String, expirationDate: Date) {
    this.Authorization = token;
    this.address = address;
    this.setStartDate(startDate);
    this.setEndDate(endDate);
    this.expirationDate = expirationDate;
}

  setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
  }

public setEndDate(timestamp: String){

    let dateString = timestamp.toString();
    dateString = this.setCharAt(dateString, 10, 'T');
    let newDate = new Date(dateString);
    this.endDate = newDate;
    //"yyyy-MM-dd hh:mm:ss");
    // 0123456789012345678
}


public setStartDate(timestamp: String) {
  let dateString = timestamp.toString();
  dateString = this.setCharAt(dateString, 10, 'T');
  let newDate = new Date(dateString);
  this.startDate = newDate;
}

public getLeftTime(){
    console.log("Current date: "+new Date());
    console.log("Expire date: "+ this.endDate);
  var time = (this.endDate.getTime() - new Date().getTime())/1000;
  return time;
}
public getAddress() {
  return this.address;
}
public setAddress(address: String) {
  this.address = address;
}

  setEndDateWithDate(newdate: Date) {
    this.endDate = newdate;
  }
}
