import axios from 'axios' 
const RANKING_PATH = '/ranking'
const SHIPS_PATH = '/artists'
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
}
