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

import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'Get Request for users';
  }

  @Get(':id/:optionalParam?')
  public getUsersWithParamsAndQuery(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(0)) limit: number,
    @Query('offset', ParseIntPipe, new DefaultValuePipe(0)) offset: number,
    @Param('id', ParseIntPipe) id: number,
    @Param() restParams: any,
  ) {
    return `Get Request for users with params: \n id: ${id + 100000000} \n ${JSON.stringify(restParams)} \n and query: \n limit: ${limit} \n offset: ${offset}`;
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

  @Post(':id')
  public addUserWithBody(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    newUser: CreateUserDto,
  ) {
    newUser.sayHello();
    return `Post Request for users with body: \n ${JSON.stringify(newUser)}`;
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
