import { Repository } from '../../util/base-interface';
import { User } from '../models/user.entity';

export interface UserRepositoryInterface extends Repository<User, number> {
  index(): Array<User>;
  getById(id: number): User;
  createOne(entity: User): User;
  updateOne(entity: User): User;
  deleteOne(entity: User): User;
}
