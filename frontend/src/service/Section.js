import { ResClient } from './RestClient'

export default class SectionService extends ResClient {
  constructor() {
    super('section');
  }
}

export const section = new SectionService();