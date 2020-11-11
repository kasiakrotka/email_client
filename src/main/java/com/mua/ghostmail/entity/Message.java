package com.mua.ghostmail.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Message {

    public Message(String id, String sender, Date date, String seen, String body) {
        this.id = id;
        this.sender = sender;
        this.date = date;
        this.seen = seen;
        this.body = body;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    private  Mailbox mailbox;

    @OneToMany(
            mappedBy = "message",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Header> headers = new ArrayList<>();

    private String sender;
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @NotNull
    private String seen;
    @Lob
    private String body;

    public Message() {

    }
}
