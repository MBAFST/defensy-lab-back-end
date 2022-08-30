import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Evaluation{
    @PrimaryColumn()
    id!: number;

    @Column({ name: "members_reaction" })
    membersReaction!: string;

    @Column({ name: "documenting_procedures" })
    documentingProcedures!: string;
    
    @Column({ name: "needed_information" })
    neededInformation!: string;

    @Column({ name: "actions_could_prevented_recovery" })
    actionsCouldPreventedRecovery!: string;

    @Column({ name: "members_must_do" })
    membersMustDo!: string;

    @Column({ name: "correct_actions" })
    correctActions!: string;

    @Column({ name: "additional_resources_needed" })
    additionalResourcesNeeded!: string;

    @Column({ name: "other_recommandations" })
    otherRecommandations!: string;
}
