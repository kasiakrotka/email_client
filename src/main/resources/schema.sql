CREATE TABLE MESSAGES (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender varchar(78) NOT NULL,
    recipient varchar(78) NOT NULL,
    numberId int NOT NULL,
    receivedDate timestamp NULL,
    replayTo varchar(78) NULL,
    sentDate timestamp NULL,
    subject varchar(78) NOT NULL,
    body varchar(2000) NULL
);