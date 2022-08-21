drop database if exists raiseguard;

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
	user_id								bigint					not null,
	contact								varchar(255)			not null,
	place								varchar(255)			not null,
	profil_photo						blob,
	foreign key(user_id) references user(id)
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
	foreign key(id) references incident(id)
);

create table if not exists attachments(
	id									bigint 					not null primary key,
	image_1								blob,
	image_2								blob,
	image_3								blob,
	image_4								blob,
	image_5								blob,
	foreign key(id) references incident(id)
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
	foreign key(id) references incident(id)
);

create table if not exists follow_up(
	id									bigint					not null primary key,
	reviewer							int						not null,
	recommanded_actions					varchar(255)			not null,
	rapporter							varchar(255)			not null,
	carred_out							varchar(255)			not null,
	foreign key(id) references incident(id)
);

create table if not exists information(
	id									bigint					not null primary key,
	date_of_notification				date					not null,
	tier								int						not null,
	date_of_detection					date					not null,
	type_of_software					varchar(255)			not null,
	foreign key(id) references incident(id)
);

create table if not exists notification(
	id									bigint					not null primary key,
	notifier							int						not null,
	foreign key(id) references incident(id)
);

create table if not exists resume(
	id									bigint					not null,
	detection_type						int						not null,
	description							varchar(255)			not null,
	members								varchar(255)			not null,
	foreign key(id) references incident(id)
);
