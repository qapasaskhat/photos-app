import axios from "axios"

const ACCESS_KEY = 'N6vp798e8_alW-H8yqFJL6ZunuHjEihCXzHVXyg0hWs'
const SECRET_KEY = 'Y7V1JxPSx7OkUbI59XhIESPz8djo9iFUK_3bl3tc6RQ'

export const getPhotosListAPI = (per_page: number, page: number, order_by: string) => {
    const url = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}&per_page=${per_page}`
    return axios.get(url)
}

export const getPhotoByIdAPI = (id: string) => {
    const url = `https://api.unsplash.com/photos/${id}/?client_id=${ACCESS_KEY}`
    return axios.get(url)
}

export const searchPhotosAPI = (query: string) => {
    const url = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${query}&per_page=${36}`
    return axios.get(url)
}