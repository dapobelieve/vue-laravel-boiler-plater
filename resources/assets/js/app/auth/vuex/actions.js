export const register = ({dispatch}, {payLoad, context}) => {
    return axios.post('api/register', payLoad).then(response => {
        console.log(response.data)
    })
    .catch(error => {
        context.errors = error.response.data.errors
    })
}