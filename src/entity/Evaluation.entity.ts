import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Evaluation{
    @Column({name : "incident_id"})
    id : Number ;

    @Column()
    memberReaction : String ;

    @Column()
    documentingProcedures : String;
    
    @Column()
    neededInformation : String;

    @Column()
    actionsCouldPreventedRecovery : String;

    @Column()
    membersMustDo : String;

    @Column()
    correctActions : String;

    @Column()
    additionalResourcesNeeded : String;

    @Column()
    otherRecommandations : String;


}