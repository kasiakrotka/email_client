

export class User {

  private address: String;
  private endDate: Date;

  constructor(address: String, date: String) {
  this.address = address;
  this.setEndDate(date);
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
    //0123456789012345678
}
public getAddress() {
  return this.address;
}
public setAddress(address: String) {
  this.address = address;
}

}
