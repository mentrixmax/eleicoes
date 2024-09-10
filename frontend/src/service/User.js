import { ResClient } from './RestClient'

export default class UserService extends ResClient {
  constructor() {
    super('users');
  }
}

export const user = new UserService();