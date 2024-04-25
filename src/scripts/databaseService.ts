import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios' 
const RANKING_PATH = '/ranking'
const SHIPS_PATH = '/ships'
const CHARACTERS_PATH = '/characters'

export default class DatabaseService {
  API_URL: string
  constructor () {
    this.API_URL = 'http://localhost:3000'
  }
  async getRanking () {
    const { data } = await axios.get(this.API_URL + RANKING_PATH)
    return data
  }

  async getShips () {
    const { data } = await axios.get(this.API_URL + SHIPS_PATH)
    return data
  }

  async getCharacters () {
    const { data } = await axios.get(this.API_URL + CHARACTERS_PATH)
    return data;
  }

  async postScore(name: String, score: number) {
    const config: AxiosRequestConfig = {
      headers: {
        'Accept': 'application/json',
      } as RawAxiosRequestHeaders,
    }

    const id: number = (await axios.get(this.API_URL + RANKING_PATH + '?_page=1&_limit=1')).headers['x-total-count']

console.log(id)

    const data = {'id': id, 'name': name, 'score': score}
    const response: AxiosResponse = await axios.post(this.API_URL + RANKING_PATH, data, config)
    console.log(response.status)
    console.log(response.data.json)
  }
}
