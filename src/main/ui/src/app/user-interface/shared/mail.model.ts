
export class Mail {

    public sender: string;
    public topic: string; 
    public text: string; 
    public seen?: boolean;
    public id?: string;
    //jeszcze dodać godzinę i datę 
    
    constructor(sender: string, topic: string, text: string) {
        
        this.sender = sender;
        this.topic = topic;
        this.text = text;
    }
    
}