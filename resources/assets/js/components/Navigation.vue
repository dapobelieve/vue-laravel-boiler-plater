<template>
    <div>
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <router-link class="navbar-brand" :to="{name: 'home'}">Believe</router-link>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <ul class="nav navbar-nav navbar-right" v-if="!user.authenticated">
                        <li><router-link :to="{name: 'login'}">Login</router-link></li>
                        <li><router-link :to="{name: 'register'}">Register</router-link></li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right" v-if="user.authenticated">
                        <li><router-link :to="{name: 'timeline'}">Timeline</router-link></li>
                            
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true" >
                                   {{ user.data.name }} <span class="caret"></span>
                                </a>
                                <a href="#" @click.prevent="signout">logout</a>
                            </li>
                        <!-- @endguest -->
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        signout () {
            this.logout().then(() => {
                alert('GoodBye :(')
                this.$router.replace({ name: 'login' })
            })
        }
    },
    mounted() {
        // console.log(this.user)
    }

}
</script>

