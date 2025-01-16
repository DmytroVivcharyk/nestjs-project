import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public login({ email, password, id }) {
    const user = this.usersService.getUserById(id);

    console.log(email, password, id);
    return `User: \n ${JSON.stringify(user)}`;
  }

  public isAuthenticated() {
    return false;
  }
}
