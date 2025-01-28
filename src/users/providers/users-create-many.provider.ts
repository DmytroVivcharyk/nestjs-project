import {
  Injectable,
  RequestTimeoutException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource, Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject DataSource
     */
    private readonly dataSource: DataSource,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * The method/transaction that creates a many users one by one
   * @param newUser: CreateUserDto
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    console.log('ConflictException11111----------');
    const emailsOfUsersToCreate = createManyUsersDto.users.map(
      (user) => user.email,
    );
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch {
      throw new RequestTimeoutException('Unable to connect to database', {
        description: 'Error connecting to database, please try again later',
      });
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = this.userRepository.create(user);
        await queryRunner.manager.save(newUser);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      console.log(error);

      if (error.code === '23505') {
        throw new BadRequestException('user with this data already exists', {
          description: String(error.detail),
        });
      }

      throw new ConflictException('Could not complete the transaction', {
        description: String(error.detail),
      });
    } finally {
      await queryRunner.release();
    }

    return await this.userRepository.find({
      where: {
        email: In(emailsOfUsersToCreate),
      },
    });
  }
}
