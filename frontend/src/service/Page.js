import { ResClient } from './RestClient'

export default class PageService extends ResClient {
  constructor() {
    super('pages')
  }

  async findByName(name = "") {
    this.refreshToken();
    const response = await this.request({
      method: 'GET',
      url: `/name/${name}`
    })

    return response.data;
  }

  async listImages() {
    this.refreshToken();
    const response = await this.request({
      method: 'GET',
      url: `/images`
    });
    return response.data;
  }

  async uploadImage(files, progressCallback) {
    this.refreshToken();
    return new Promise((resolve, reject) => {
      
      let data = new FormData()
      data.append('file', files[0])
    
      this.request.post('/images/upload', data, { onUploadProgress: progressCallback })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  } 
}

export const page = new PageService();