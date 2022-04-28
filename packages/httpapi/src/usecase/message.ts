import Message from "../entity/message";
import MessageRegistry from "../registry/message";

export default class MessageUseCase {
  private messageRegistry: MessageRegistry;

  constructor(messageRegistry: MessageRegistry) {
    this.messageRegistry = messageRegistry;
  }

  async readAll(): Promise<Array<Message>> {
    return this.messageRegistry.readAll();
  }

  async create(message: Message): Promise<void> {
    this.messageRegistry.create(message);
  }

  async sign(id: number, txSigned: string): Promise<void> {
    const message = await this.messageRegistry.readById(id);

    if (!txSigned.startsWith('signed:')) {
      throw new Error('invalid signed message');
    }

    message.txSigned = txSigned;
    await this.messageRegistry.update(message);
  }
}
