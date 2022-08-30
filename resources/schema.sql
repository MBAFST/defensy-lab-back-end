create database if not exists raiseguard;

use raiseguard;

create table if not exists user(
	id									bigint					not null primary key AUTO_INCREMENT,
	username							varchar(255)			not null unique,
	first_name							varchar(255)			not null,
	last_name							varchar(255)			not null,
	email								varchar(255)			not null unique,
	is_admin							varchar(5),
	password							varchar(255)			not null
);

create table if not exists token(
	id									bigint					not null primary key AUTO_INCREMENT,
	user_id								bigint					not null,
	token								varchar(255)			not null,
	expired_at							datetime				not null,
	issued_at							datetime				not null,
	constraint fk_token_user foreign key (user_id) references user(id)
);

create table if not exists reset(
	id									bigint					not null primary key AUTO_INCREMENT,
	email								varchar(255)			not null,
	token								varchar(255)			not null unique
);

create table if not exists client(
	id									bigint					not null,
	contact								varchar(255)			not null,
	place								varchar(255)			not null,
	profil_photo						blob,
	foreign key (id) references user(id)
);

create table if not exists incident(
	id									bigint					not null primary key AUTO_INCREMENT,
	user_id								bigint					not null,
	foreign key (user_id) references user(id)
);

create table if not exists actions(
	id									bigint					not null primary key,
	identification_measures				varchar(255)			not null,
	restraint_measures					varchar(255)			not null,
	evidence_collected					varchar(255)			not null,
	eradication_measures				varchar(255)			not null,
	recovery_measure					varchar(255)			not null,
	other_mitigation_measures			varchar(255)			not null,
	foreign key (id) references incident(id)
);

create table if not exists attachments(
	id									bigint 					not null primary key,
	image_1								blob,
	image_2								blob,
	image_3								blob,
	image_4								blob,
	image_5								blob,
	foreign key (id) references incident(id)
);

create table if not exists evaluation(
	id									bigint					not null primary key,
	members_reaction					varchar(255)			not null,
	documenting_procedures				varchar(255)			not null,
	needed_information					varchar(255)			not null,
	actions_could_prevented_recovery	varchar(255)			not null,
	members_must_do						varchar(255)			not null,
	correct_actions						varchar(255)			not null,
	additional_resources_needed			varchar(255)			not null,
	other_recommandations				varchar(255)			not null,
	foreign key (id) references incident(id)
);

create table if not exists follow_up(
	id									bigint					not null primary key,
	reviewer							int						not null,
	recommanded_actions					varchar(255)			not null,
	rapporter							varchar(255)			not null,
	carred_out							varchar(255)			not null,
	foreign key (id) references incident(id)
);

create table if not exists information(
	id									bigint					not null primary key,
	date_of_notification				date					not null,
	tier								int						not null,
	date_of_detection					date					not null,
	type_of_software					varchar(255)			not null,
	foreign key (id) references incident(id)
);

create table if not exists notification(
	id									bigint					not null primary key,
	notifier							int						not null,
	other								varchar(255),
	foreign key (id) references incident(id)
);

create table if not exists resume(
	id									bigint					not null,
	detection_type						int						not null,
	description							varchar(255)			not null,
	members								varchar(255)			not null,
	foreign key (id) references incident(id)
);

insert into incident (user_id) values(2);
insert into incident (user_id) values(2);
insert into incident (user_id) values(2);
insert into incident (user_id) values(3);
insert into incident (user_id) values(3);
insert into incident (user_id) values(4);

insert into client(id, contact, place) values(2, "21000000", "Tunisia");
insert into client(id, contact, place) values(3, "21000000", "Tunisia");
insert into client(id, contact, place) values(4, "21000000", "Tunisia");

insert into actions values(1, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into actions values(2, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into actions values(3, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into actions values(4, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into actions values(5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into actions values(6, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");

insert into attachments(id) values(1);
insert into attachments(id) values(2);
insert into attachments(id) values(3);
insert into attachments(id) values(4);
insert into attachments(id) values(5);
insert into attachments(id) values(6);

insert into evaluation values(1, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into evaluation values(2, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into evaluation values(3, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into evaluation values(4, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into evaluation values(5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into evaluation values(6, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");

insert into follow_up values(1, 5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into follow_up values(2, 5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into follow_up values(3, 5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into follow_up values(4, 5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into follow_up values(5, 5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");
insert into follow_up values(6, 5, "Hi it's me Mario!", "Hi it's me Mario!", "Hi it's me Mario!");

insert into information values(1, '2022-8-30', 5, '2022-8-30', "Hi it's me Mario!");
insert into information values(2, '2022-8-30', 5, '2022-8-30', "Hi it's me Mario!");
insert into information values(3, '2022-8-30', 5, '2022-8-30', "Hi it's me Mario!");
insert into information values(4, '2022-8-30', 5, '2022-8-30', "Hi it's me Mario!");
insert into information values(5, '2022-8-30', 5, '2022-8-30', "Hi it's me Mario!");
insert into information values(6, '2022-8-30', 5, '2022-8-30', "Hi it's me Mario!");

insert into notification(id, notifier) values(1, 5);
insert into notification(id, notifier) values(2, 5);
insert into notification(id, notifier) values(3, 5);
insert into notification(id, notifier) values(4, 5);
insert into notification(id, notifier) values(5, 5);
insert into notification(id, notifier) values(6, 5);

insert into resume values(1, 5, "Hi it's me Mario!", "Mario, Luigi, Yoshi");
insert into resume values(2, 5, "Hi it's me Mario!", "Mario, Luigi, Yoshi");
insert into resume values(3, 5, "Hi it's me Mario!", "Mario, Luigi, Yoshi");
insert into resume values(4, 5, "Hi it's me Mario!", "Mario, Luigi, Yoshi");
insert into resume values(5, 5, "Hi it's me Mario!", "Mario, Luigi, Yoshi");
insert into resume values(6, 5, "Hi it's me Mario!", "Mario, Luigi, Yoshi");
