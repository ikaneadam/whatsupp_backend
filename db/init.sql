CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
    UUID uuid DEFAULT uuid_generate_v4 (),
    username varchar(255) NOT NULL unique,
    password varchar(255) NOT NULL,
    friendShipCode varchar(255) unique,
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
    createdDate text NOT NULL,
    isGroupsChat boolean NOT NULL,
    CONSTRAINT Chats_pk PRIMARY KEY (UUID)
);

CREATE TABLE Message (
    UUID uuid DEFAULT uuid_generate_v4 (),
    content text NOT NULL,
    chatUUID uuid NOT NULL,
    username varchar(255),
    TimeStamp text,
    CONSTRAINT Message_pk PRIMARY KEY (UUID)
);

CREATE TABLE FriendLists(
    UUID uuid DEFAULT uuid_generate_v4 (),
    user_one_uuid uuid NOT NULL,
    user_two_uuid uuid NOT NULL,
    CONSTRAINT FriendLists_pk PRIMARY KEY (UUID)
);

CREATE TABLE FriendRequests (
    UUID uuid DEFAULT uuid_generate_v4 (),
    Receiver_uuid uuid NOT NULL,
    Requester_uuid uuid NOT NULL,
    status boolean NOT NULL,
    CONSTRAINT FriendRequests_pk PRIMARY KEY (UUID)
);


ALTER TABLE Message ADD CONSTRAINT Message_fk0 FOREIGN KEY (chatUUID) REFERENCES Chats(UUID);

ALTER TABLE UsersChats ADD CONSTRAINT UsersChats_fk0 FOREIGN KEY (userUUID) REFERENCES Users(UUID);
ALTER TABLE UsersChats ADD CONSTRAINT UsersChats_fk1 FOREIGN KEY (chatUUID) REFERENCES Chats(UUID);


ALTER TABLE FriendLists ADD CONSTRAINT FriendLists_fk0 FOREIGN KEY (user_one_uuid) REFERENCES Users(UUID);
ALTER TABLE FriendLists ADD CONSTRAINT FriendLists_fk1 FOREIGN KEY (user_two_uuid) REFERENCES Users(UUID);


ALTER TABLE FriendRequests ADD CONSTRAINT FriendRequests_fk0 FOREIGN KEY (Receiver_uuid) REFERENCES Users(UUID);
ALTER TABLE FriendRequests ADD CONSTRAINT FriendRequests_fk1 FOREIGN KEY (Requester_uuid) REFERENCES Users(UUID);

