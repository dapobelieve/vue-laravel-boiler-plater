import { setHttpToken } from '../../../helpers'
import localForage from 'localforage'

export const register = ({dispatch}, {payLoad, context}) => {
    return axios.post('api/register', payLoad).then(response => {
        dispatch('setToken', response.data.meta.token).then(()=> {
            dispatch('fetchUser');
        })
    })
    .catch(error => {
        context.errors = error.response.data.errors
    })
}

export const login = ({dispatch}, {payLoad, context}) => {
    return axios.post('api/login', payLoad).then(response => {
        // set token
        dispatch('setToken', response.data.meta.token).then(()=> {
            dispatch('fetchUser');
        })
    })
    .catch(error => {
        // this (context) was the vue instance
        context.errors = error.response.data.errors
    })
}

export const fetchUser = ({ commit }) => {
    return axios.get('api/me').then((response) => {
        // console.log(response.data)
        commit('setAuthUser', true);
        commit('setUserData', response.data.data)
    })
}

export const logout = ({ dispatch }) => {
    return axios.post('api/logout').then((response) => {
        dispatch('clearAuth')
    })
}

// set the auth token from the login action
export const setToken = ({ commit, dispatch }, token) => {

    if (token === ''){

        return dispatch('checkTokenExists', '').then((token) => {

            setHttpToken(token);

        })
    }


    commit('setToken', token);
    setHttpToken(token);
} 

export const checkTokenExists = ({commit, dispatch}, token) => {

    return localForage.getItem('authtoken').then((token) => {

        if (!token){

            return Promise.reject('NO_STORAGE_TOKEN')
        }

        return Promise.resolve(token)
    })

}

export const clearAuth = ({commit}) => {
    commit('setAuthUser', false)
    commit('setUserData', null)
    commit('setToken', null)
    setHttpToken(null);
}