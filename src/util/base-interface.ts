export interface Repository<T, K> {
  index(): Array<T>;
  getById(id: K): T;
  createOne(entity: T): T;
  updateOne(entity: T): T;
  deleteOne(entity: T): T;
}
