package com.mua.ghostmail.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Header {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private  Message message;

    @NotNull
    private String content;
}
