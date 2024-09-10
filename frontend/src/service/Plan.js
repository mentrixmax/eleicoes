import { ResClient } from './RestClient';

export default class PlanService extends ResClient {
  constructor() {
    super('plans');
  }
}

export const plan = new PlanService();