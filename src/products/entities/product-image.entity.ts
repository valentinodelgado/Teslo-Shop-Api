import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "products_images"})
export class ProductImage {

    @ApiProperty({
        description: 'Product image unique identifier',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Image URL or filename',
        example: 'product-123-main.jpg',
    })
    @Column("text")
    url: string

    @ApiProperty({
        description: 'Associated product',
        type: () => Product,
    })
    @ManyToOne(
        () => Product,
        (product) => product.images,
        {onDelete:"CASCADE"}
    )
    product: Product

}