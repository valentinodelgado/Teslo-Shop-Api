import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from "@nestjs/swagger";


@Entity("users")
export class User {

    @ApiProperty({
        description: 'User unique identifier',
        example: 'c1b2f9c4-0c55-4c9a-9e8d-4e4c5f7e1234',
        format: 'uuid',
    })
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({
        description: 'User email address (unique)',
        example: 'user@email.com',
    })
    @Column("text",{
        unique:true
    })
    email: string

    @ApiProperty({
        description: 'User password (never returned in responses)',
        writeOnly: true,
        example: 'Password123!',
    })
    @Column("text",{
        select:false
    })
    password: string

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
    })
    @Column("text")
    fullName: string

    @ApiProperty({
        description: 'Indicates if the user is active',
        example: true,
    })
    @Column("bool",{
        default:true
    })
    isActive: boolean

    @ApiProperty({
        description: 'User roles',
        example: ['admin', 'user'],
        type: [String],
    })
    @Column("text",{
        array:true,
        default:["user"]
    })
    roles:string[]

    @ApiProperty({
        description: 'Products created by the user',
        type: () => Product,
        isArray: true,
    })
    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product:Product

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim()
    }
    
    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }

}
