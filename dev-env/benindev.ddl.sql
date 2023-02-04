

drop table if exists Photo;
drop table if exists Gratuation;
drop table if exists Profil;
drop table if exists Account;

create table Account(
  id integer not null primary key autoincrement,
  email varchar(100) not null unique,
  passwordHash varchar(200)
);

create table Profil(
  accountId integer not null references Account (id),
  pseudo varchar(50),
  firstName varchar(100),
  lastName varchar(100),
  skills text,
  localisation varchar(200),
  description text,
  links text,
  createAt timestamp not null default current_timestamp,
  updateAt timestamp not null default current_timestamp,
  primary key (accountId)
);

create table Gratuation(
  profilId integer not null references Profil (accountId),
  status varchar,
  gatuationYear integer,
  primary key (profilId)
);

create table Photo(
  uid varchar not null primary key,
  originalName varchar not null,
  height integer not null,
  width integer not null,
  weightB integer not null,
  mediaType varchar(50) not null,
  binaryFile blob not null,
  profilId integer not null references Profil (accountId)
);