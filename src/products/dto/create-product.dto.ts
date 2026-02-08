import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"


export class CreateProductDto {

    @ApiProperty({
        description: "Product title (unique)",
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string

    @ApiProperty({
    description: "Product price",
    example: 49.99,
    minimum: 0,
    required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number

    @ApiProperty({
    description: "Detailed product description",
    example: "Premium cotton t-shirt with relaxed fit",
    required: false,
    })
    @IsString()
    @IsOptional()
    description?:string

    @ApiProperty({
    description: "SEO friendly slug (auto-generated if not provided)",
    example: "tesla_t_shirt",
    required: false,
    })
    @IsString()
    @IsOptional()
    slug?: string

    @ApiProperty({
    description: "Available product stock",
    example: 20,
    required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    @ApiProperty({
    description: "Available product sizes",
    example: ["S", "M", "L", "XL"],
    type: [String],
    })
    @IsString({each:true})
    @IsArray()
    sizes: string[]

    @ApiProperty({
    description: "Product gender category",
    example: "unisex",
    enum: ["men", "woman", "kid", "unisex"],
    })
    @IsIn(["men","woman","kid","unisex"])
    gender: string

    @ApiProperty({
    description: "Product tags",
    example: ["shirt", "casual", "summer"],
    type: [String],
    required: false,
    })
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    tags?: string[]

    @ApiProperty({
    description: "Product image filenames or URLs",
    example: ["img1.jpg", "img2.jpg"],
    type: [String],
    required: false,
    })
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    images?: string[]
}
