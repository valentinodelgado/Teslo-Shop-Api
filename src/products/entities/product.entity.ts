import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "products"})
export class Product {

    @ApiProperty({
        example: "1fab36d4-0552-41d0-a978-338dc452014e",
        description: "Product ID",
        uniqueItems: true,
        format: "uuid"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({
        example: "T-Shirt",
        description: "Product Title",
        uniqueItems: true
    })
    @Column("text", {
        unique:true
    })
    title:string

    @ApiProperty({
        example: 0,
        description: "Product price",
    })
    @Column("float",{
        default:0
    })
    price: number

    @ApiProperty({
        example: "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
        description: "Product description"
    })
    @Column("text",{
        nullable:true
    })
    description: string

    @ApiProperty({
        example: "t_shirt_teslo",
        description: "Product SLUG - for SEO",
        uniqueItems: true
    })
    @Column("text",{
        unique:true
    })
    slug: string

    @ApiProperty({
        example: 10,
        description: "Product stock",
        default: 0
    })
    @Column("int", {
        default:0
    })
    stock:number

    @ApiProperty({
        example: ["M", "XL", "XXL"],
        description: "Product sizes",
    })
    @Column("text",{
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: "women",
        description: "Product gender",
    })
    @Column("text")
    gender:string

    @ApiProperty()
    @Column("text",{
        array: true,
        default: []
    })
    tags: string[]


    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade:true, eager:true}
    )
    images?: ProductImage[]

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager:true}
    )
    user:User

    @BeforeInsert()
    checkSlugInsert(){

        if(!this.slug){
            this.slug = this.title
        }
        this.slug = this.slug.toLowerCase().replaceAll(" ","_").replaceAll("'","")
        
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug.toLowerCase().replaceAll(" ","_").replaceAll("'","")
                
    }

}
