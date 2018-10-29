<template>
    <div class="timeline">
        {{ message }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: ''
        }
    },
    mounted () {
        axios.get('api/timeline')
        .then(response => {
            console.log(response.data)
            this.message = response.data
        })
    }
}
</script>