import axios from 'axios';

export default class AuthService {
  constructor() {
    this.request = axios.create({
      baseURL: process.env.VUE_APP_API_URL
    });
  }

  login(email, password) {
    return this.request.post('/auth', {
      email,
      password
    }
    )
  }
}

export const Auth = new AuthService()