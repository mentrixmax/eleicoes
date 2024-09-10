import { ResClient } from './RestClient';

export default class ContactService extends ResClient {
  constructor() {
    super('contact');
  }
}

export const contact = new ContactService();