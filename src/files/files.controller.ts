import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter,fileNamer } from './helpers';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags("Files - Get and Upload")
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get("product/:imageName")
  @ApiOperation({ summary: 'Get a product image by filename' })
  @ApiParam({
    name: 'imageName',
    description: 'Product image filename',
    example: 'product-123-main.jpg',
  })
  @ApiResponse({
    status: 200,
    description: 'Image file',
  })
  @ApiResponse({
    status: 400,
    description: 'Image not found',
  })
  findProductImage(
    @Res() res: Response,
    @Param("imageName") imageName: string){

    const path = this.filesService.getStaticProductImage(imageName)

    return res.sendFile(path)
  }

  @Post("product")
  @ApiOperation({ summary: 'Upload a product image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product image file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      example: {
        secureUrl: 'http://localhost:3000/api/files/product/product-123-main.jpg',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file type (only images allowed)',
  })
  @UseInterceptors(FileInterceptor("file",{
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: "./static/products",
      filename: fileNamer
    })
  }))
  uploadFile(@UploadedFile()   file: Express.Multer.File){
    
    if (!file){
      throw new BadRequestException("Make sure that the file is an image")
    }

    const secureUrl = `${this.configService.get("HOST_API")}/files/product/${file.filename}`

    return{secureUrl}
  }
}
