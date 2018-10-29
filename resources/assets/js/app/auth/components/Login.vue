<template>
    <div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">
                    <div class="alert alert-danger" v-if="errors.root">
                        {{ errors.root }}
                    </div>
                    <form @submit.prevent="submit" class="form-horizontal">

                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6"  :class="{ 'has-error': errors.email }">
                                <input type="email" v-model="form.email" class="form-control"  autofocus>

                                <span class="help-block" v-if="errors.email">
                                    <strong>{{ errors.email[0] }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6" :class="{ 'has-error': errors.password }">
                                <input id="password" v-model="form.password" type="password" class="form-control" >

                            <span class="help-block" v-if="errors.password">
                                <strong>{{ errors.password[0] }}</strong>
                            </span>

                            </div>
                        </div>

                        <!-- <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div> -->

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                                <!-- <a class="btn btn-link" href="">
                                    Forgot Your Password?
                                </a> -->
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import localForage from 'localforage'

export default {
    data () {
        return {
            errors: [],
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submit () {
            this.login({
                payLoad: this.form,
                context: this
            }).then(() => {
                localForage.getItem('intended').then((name) => {
                    if (name === null){
                        this.$router.replace({ name: 'home' })
                    }

                    this.$router.replace({ name: name })
                })
            })
        }
    }
}
</script>