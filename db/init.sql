CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
    UUID uuid DEFAULT uuid_generate_v4 (),
    username varchar(255) NOT NULL unique,
    CONSTRAINT Users_pk PRIMARY KEY (UUID)
);

CREATE TABLE UsersChats (
    UUID uuid DEFAULT uuid_generate_v4 (),
    userUUID uuid NOT NULL,
    chatUUID uuid NOT NULL,
    CONSTRAINT UsersChats_pk PRIMARY KEY (UUID)
);

CREATE TABLE Chats(
    UUID uuid DEFAULT uuid_generate_v4 (),
    chatName varchar(255) NOT NULL,
    CONSTRAINT Chats_pk PRIMARY KEY (UUID)
);

CREATE TABLE Message (
    UUID uuid DEFAULT uuid_generate_v4 (),
    content text NOT NULL,
    chatUUID uuid NOT NULL,
    username varchar(255),
    isReceived varchar(1)
    TimeStamp text,
    CONSTRAINT Message_pk PRIMARY KEY (UUID)
);



ALTER TABLE Message ADD CONSTRAINT Message_fk0 FOREIGN KEY (chatUUID) REFERENCES Chats(UUID);

ALTER TABLE UsersChats ADD CONSTRAINT UsersChats_fk0 FOREIGN KEY (userUUID) REFERENCES Users(UUID);
ALTER TABLE UsersChats ADD CONSTRAINT UsersChats_fk1 FOREIGN KEY (chatUUID) REFERENCES Chats(UUID);


