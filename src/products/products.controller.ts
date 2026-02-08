import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from '../auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({status:201, description:"Product was created succesfully", type:Product})
  @ApiResponse({status:400, description:"Bad request"})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status:403, description:"Forbidenn. Token related"})
  create(@Body() createProductDto: CreateProductDto, @GetUser() user:User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products (paginated)' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items to return',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Number of items to skip',
    example: 0,
  })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [Product],
  })
  findAll(@Query() pagintationDto:PaginationDto) {
    return this.productsService.findAll(pagintationDto);
  }

  @Get(':term')
  @ApiOperation({summary: 'Get a product by id, slug or title'})
  @ApiParam({name: 'term', description: 'Product UUID, slug or title', example: 'tesla_t_shirt'})
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: Product,
  })
  @ApiResponse({status: 404, description: 'Product not found'})
  @ApiResponse({status: 500, description: 'Unexpected server error'})
  findOne(@Param('term', ) term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Update a product (admin only)' })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id', description: 'Product UUID', example: '1fab36d4-0552-41d0-a978-338dc452014e'})
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: Product,
  })
  @ApiResponse({status: 400, description: 'Bad request (validation or duplicated field)'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden – admin role required'})
  @ApiResponse({status: 404, description: 'Product not found'})
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto, @GetUser() user:User) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Delete a product (admin only)' })
  @ApiBearerAuth('access-token')
  @ApiParam({name: 'id',description: 'Product UUID',example: '1fab36d4-0552-41d0-a978-338dc452014e'})
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
    schema: {
      example: 'Producto eliminado correctamente'},
  })
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden – admin role required'})
  @ApiResponse({status: 404, description: 'Product not found'})
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
