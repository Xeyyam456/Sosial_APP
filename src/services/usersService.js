import api from './api'

const RANDOM_USER_URL = 'https://randomuser.me/api'

export const getRandomUsers = (results = 6) => {
  return api
    .get(RANDOM_USER_URL, { params: { results, inc: 'name,picture,login' } })
    .then(({ data }) => data.results)
}
