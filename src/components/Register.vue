<template>
    <div class="register">
        <v-container>
            <v-layout>
                <v-flex>
                    <form>
                        <v-text-field
                                v-model="name"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Name"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="Email"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :error-messages="passwordErrors"
                                type="password"
                                label="Password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="city"
                                label="City"
                                @input="$v.city.$touch()"
                                @blur="$v.city.$touch()"
                        ></v-text-field>
                        <v-text-field
                                v-model="country"
                                label="City"
                                @input="$v.country.$touch()"
                                @blur="$v.country.$touch()"
                        ></v-text-field>
                        <v-btn class="mr-4" @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email, minLength} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            name: {required, maxLength: maxLength(1)},
            email: {required, email},
            password: {required, minLength: minLength(6)},
        },

        data: () => ({
            name: '',
            email: '',
            password: '',
            city: '',
            country: '',
        }),

        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.name.$dirty) return errors;
                !this.$v.name.maxLength && errors.push('Name must be at least 1 characters long');
                !this.$v.name.required && errors.push('Name is required.');
                return errors
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.email && errors.push('Must be valid e-mail');
                !this.$v.email.required && errors.push('E-mail is required');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.minLength && errors.push('Password must be at least 6 characters long');
                !this.$v.password.required && errors.push('Password is required.');
                return errors;
            },
        },

        methods: {
            submit() {
                this.$v.$touch()
            },
            clear() {
                this.$v.$reset();
                this.name = '';
                this.email = '';
                this.password = '';
                this.city = '';
                this.country = '';
            },
        },
    }
</script>


<style scoped>

</style>