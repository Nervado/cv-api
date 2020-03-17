export interface Repository<T, K> {
  index(): Array<T>;
  getById(id: K): T;
  create(entity: T): T;
  update(entity: T): T;
  delete(entity: T): T;
}
