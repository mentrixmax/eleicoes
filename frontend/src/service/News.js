import { ResClient } from "./RestClient";

export default class NewsService extends ResClient{
  constructor() {
    super('news');
  }
}

export const news = new NewsService();