import { rest } from 'msw'
import { ships } from '../data/ships' // Assure-toi que le chemin d'importation est correct et que `ships` est bien typé

const API_URL: string = 'https://swapi.dev/api'

export const success = [
  rest.get(`${API_URL}/starships/*`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ships))
  }),
]

export const networkError = [
  rest.get(`${API_URL}/*`, (req, res, ctx) => {
    return res.networkError('Handler : Failed to connect')
  }),
]