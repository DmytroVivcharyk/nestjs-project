import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { UsersService } from './providers/users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  private readonly UsersService: UsersService;

  constructor(
    /**
     *  Inject ConfigService
     */
    readonly configService: ConfigService,
    usersService: UsersService,
  ) {
    this.UsersService = usersService;
  }

  @Get('injectable')
  getIngectableService() {
    return this.UsersService.getHello();
  }

  @Get()
  public getUsers() {
    console.log(this.configService.get('S3_BUCKET'));
    return 'Get Request for users';
  }

  @Get(':id/:optionalParam?')
  @ApiOperation({ summary: 'Get user by id with optional parameter' })
  @ApiResponse({ status: 200, description: 'returns a user' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'User ID',
    example: 4354,
  })
  @ApiParam({
    name: 'optionalParam',
    type: String,
    required: false,
    description: 'Optional Additional parameter',
    example: 'hasCar',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Offset',
    example: 0,
  })
  public getUsersWithParamsAndQuery(
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Param('id', ParseIntPipe) id: number,
    @Param() restParams: any,
  ) {
    return `Get Request for users with params: \n id: ${id} \n ${JSON.stringify(restParams)} \n and query: \n limit: ${limit} \n offset: ${offset}`;
  }

  @Post()
  public addUser(@Headers() headers: any, @Ip() ip: any) {
    // res.sendStatus(201);
    return `Post Request for users with header: \n ${JSON.stringify(headers)} \n and ip: ${ip}`;
  }

  // post with using expess req res
  @Post('express')
  public addUserWithExpress(@Req() req: Request) {
    const body = req.body;
    return `Post Request for users Express: \n ${JSON.stringify(body)}`;
  }

  @Post('create-many')
  public createMany(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    createManyUsersDto: CreateManyUsersDto,
  ) {
    return this.UsersService.createManyUsers(createManyUsersDto);
  }

  @Post(':id')
  public addUserWithBody(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    newUser: CreateUserDto,
  ) {
    newUser.sayHello();
    return this.UsersService.createUser(newUser);
  }

  @Patch(':id')
  public patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    updateUser: UpdateUserDto,
  ) {
    return `Patch Request for users with id: \n ${id} \n and body: \n ${JSON.stringify(updateUser)}`;
  }
}
