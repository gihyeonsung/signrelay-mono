export default interface MessageRegistry {
  create(req: Message): Promise<void>;
  readById(id: number): Promise<Message>;
  readAll(): Promise<Array<Message>>;
  update(req: Message): Promise<void>;
  delete(req: Message): Promise<void>;
}
