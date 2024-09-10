import axios from 'axios'

const isNotSet = v => v == null || v == undefined

export class ResClient {
  constructor(baseURL) {
    this.access_token = localStorage.getItem('CWP_TOKEN')
    this.request = axios.create({
      baseURL: [process.env.VUE_APP_API_URL,'api',baseURL].join('/')
    })

    this.request.defaults.headers.common['Authorization'] = this.access_token ? `Bearer ${this.access_token}` : ''
  }

  refreshToken(){
    this.access_token = localStorage.getItem('CWP_TOKEN');
    this.request.defaults.headers.common['Authorization'] = this.access_token ? `Bearer ${this.access_token}` : '';
  }

  /**
   * Lista todos os itens de um recurso
   * @param {Object} params Parámetros de URL
   * @returns {Promise}
   */
  async findAll(params = {}) {
    this.refreshToken();
    const response = await this.request.get('', {
      params
    })
    return response.data
  }

  /**
 * Lista um item de um recurso
 * @param {String|number} id
 * @param {Object} params Par창metros de URL
 * @returns {Promise}
 */
  async findById(id, params = {}) {
    this.refreshToken();
    if (isNotSet(id))
      throw new TypeError(
        `Nenhum ID foi passado para ${this.constructor.name}#findById().`
      )
    const response = await this.request.get(`${id}`, {
      params
    })
    return response.data
  }

  /**
   * Cria um item no recurso
   * @param {Object} data
   * @param {Object} params Par창metros de URL
   * @returns {Promise}
   */
  async create(data, params = {}) {
    this.refreshToken();
    if (isNotSet(data))
      throw new TypeError(
        `Nenhum dado foi enviado para ${this.constructor.name}#create()`
      )
    delete data.id
    const response = await this.request.post('', data, {
      params
    })
    return response.data
  }

  /**
   * Atualiza um item no recurso
   * @param {Object} data Campos a serem atualizados
   * @param {string|number} data.id Id do recurso a ser atualizado
   * @param {Object} params Par창metros de URL
   * @returns {Promise}
   */
  async update(data, params = {}) {
    this.refreshToken();
    if (isNotSet(data))
      throw new TypeError(
        `Nenhum dado foi passado para ${this.constructor.name}#update()`
      )
    if (isNotSet(data.id))
      throw new TypeError(
        `O campo data.id não foi passado para ${this.constructor.name}#update()`
      )
    const response = await this.request.put(`${data.id}`, data, {
      params
    })
    return response.data
  }

  /**
   * Cria ou atualiza um item no recurso
   * @param {Object.<string>} data Dados do recurso
   * @param {string|number} [data.id] Id do recurso (caso queira atualizar)
   * @param {Object} params Par창metros de URL
   * @returns {Promise}
   */
  save(data, params = {}) {
    this.refreshToken();
    if (isNotSet(data))
      throw new TypeError(
        `Nenhum dado foi passado para ${this.constructor.name}#save()`
      )
    if (isNotSet(data.id)) return this.create(data, params)
    return this.update(data, params)
  }

  /**
   * Exclui um recurso
   * @param {string|number} id
   * @param {Object} params Par창metros de URL
   * @returns {Promise}
   */
  async delete(id, params = {}) {
    this.refreshToken();
    if (isNotSet(id))
      throw new TypeError(
        `ID não foi passado para ${this.constructor.name}#delete()`
      )
    const response = await this.request.delete(`${id}`, {
      params
    })
    return response.data
  }
}