import Message from "../entity/message";
import MessageRegistry from "./message";

export default class MessageRegistryInmemory implements MessageRegistry {
  private messages: Array<Message> = [];

  async readAll(): Promise<Array<Message>> {
    return this.messages;
  }

  async readById(id: number): Promise<Message> {
    const message = this.messages.find(m => m.id === id);
    if (message === undefined) {
      throw new Error('not found');
    }

    return message;
  }

  async create(message: Message): Promise<void> {
    message.id = this.messages.length;
    this.messages.push(message);
  }

  async update(messageUpdated: Message): Promise<void> {
    const message = this.messages.find(m => m.id === messageUpdated.id);
    if (message === undefined) {
      throw new Error('not found');
    }

    message.tx = messageUpdated.tx;
    message.txSigned = messageUpdated.txSigned;
  }

  async delete(message: Message): Promise<void> {
    const i = this.messages.indexOf(message);
    if (i == -1) {
      throw new Error('not found');
    }

    delete this.messages[i];
  }
}
