import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Attachments {
    @PrimaryColumn()
    id!: number;

    @Column("blob",{ nullable:true, name:"image_1" })
    image1?: Buffer;
    
    @Column("blob",{ nullable:true, name:"image_2" })
    image2?: Buffer;
    
    @Column("blob",{ nullable:true, name:"image_3" })
    image3?: Buffer;
    
    @Column("blob",{ nullable:true, name:"image_4" })
    image4?: Buffer;
    
    @Column("blob",{ nullable:true, name:"image_5" })
    image5?: Buffer;
}
