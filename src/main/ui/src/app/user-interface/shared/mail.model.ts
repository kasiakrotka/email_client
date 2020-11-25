
export class Mail {

    public sender: string;
    public topic: string;
    public text: string;
    public seen = true;
    public id?: string;
    public date: string;
    public time: string;
    //jeszcze dodać godzinę i datę

    constructor(sender: string, topic: string, text: string) {

        this.sender = sender;
        this.topic = topic;
        this.text = text;
        this.date= "March 15";
        this.time= "08:10"
    }

}
