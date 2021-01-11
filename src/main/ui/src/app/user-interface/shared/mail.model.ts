
export class Mail {

  public id?: string;
  public date: string;
  public time: string;
    public sender: string;
    public topic: string;
    public text: string;
    public seen = true;

    //jeszcze dodać godzinę i datę

    constructor(sender: string, topic: string, text: string) {

        this.sender = sender;
        this.topic = topic;
        this.text = text;
        this.date= "March 15";
        this.time= "08:10"
    }

}
