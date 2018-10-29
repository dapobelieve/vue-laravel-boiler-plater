import localForage from 'localforage'

export const setToken = (state, token) => {
    // check empty and remove token
    if (token === '' || token === null)
    {
        localForage.removeItem('authtoken', token);
        return;
    }

    localForage.setItem('authtoken', token);
}

export const setAuthUser = (state, trueOrFalse) => {
    state.user.authenticated = trueOrFalse
}

export const setUserData = (state, data) => {
    state.user.data = data;
}