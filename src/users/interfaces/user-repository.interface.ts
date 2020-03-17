import { Repository } from '../../util/base-interface';
import { User } from '../models/user.entity';

export interface UserRepository extends Repository<User, number> {
  index(): Array<User>;
  geUserById(id: number): User;
  create(entity: User): User;
  update(entity: User): User;
  delete(entity: User): User;
}
