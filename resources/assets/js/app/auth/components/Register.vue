<template>
    <div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>
                <div class="panel-body">
                    <form @submit.prevent="submit" class="form-horizontal">

                        <div class="form-group">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6" :class="{ 'has-error': errors.name }">
                                <input id="name" type="text" v-model="form.name" class="form-control"   autofocus>
                                <span class="help-block" v-if="errors.name">
                                    <strong>{{ errors.name[0] }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6" :class="{ 'has-error': errors.email }">
                                <input id="email" v-model="form.email" type="email" class="form-control"  >
                                <span class="help-block" v-if="errors.email">
                                    <strong>{{ errors.email[0] }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6" :class="{ 'has-error': errors.password }">
                                <input id="password" v-model="form.password" type="password" class="form-control" name="password" >
                                <span class="help-block" v-if="errors.password">
                                    <strong>{{ errors.password[0] }}</strong>
                                </span>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
                                </button>
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
export default {
    data () {
        return {
            errors: [],
            form: {
                name: null,
                email: null,
                password: null
            }
        }
    },
    methods: {
        ...mapActions({
            register: 'auth/register'
        }),
        submit () {
            this.register({
                payLoad: this.form,
                context: this
            })
        }
    }
}
</script>