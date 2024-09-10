import { ResClient } from "./RestClient";

export default class AnalyticsService extends ResClient {
  constructor() {
    super('analytics');
  }

  async extra(mode = 7) {
    this.refreshToken();
    const res = await this.request.get('/extra', {
      params: {
        mode
      }
    });
    return res.data;
  }
}

export const analytics = new AnalyticsService();