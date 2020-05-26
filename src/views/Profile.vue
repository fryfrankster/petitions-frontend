<template>
    <div class="profile">
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-col>
                        <!--Users Details-->
                        <v-card class="pa-7 ma-7">
                            <v-row justify="center">
                                <v-avatar size="150">
                                    <v-img
                                            v-bind:src="userPhoto()"
                                            lazy-src="https://cloud.filmfed.com/default/avatars/l_default_orange.png"
                                    >
                                    </v-img>
                                </v-avatar>
                            </v-row>
                            <v-row justify="center">
                                <v-card-title>{{ userDetails.name }}</v-card-title>
                            </v-row>
                            <v-row justify="center">
                                <v-card-subtitle>{{ userDetails.email }}</v-card-subtitle>
                            </v-row>
                            <v-row justify="center">
                                <v-card-subtitle>
                                    {{ userDetails.city }} {{ userDetails.country }}
                                </v-card-subtitle>
                            </v-row>

                            <!--Edit Profile-->
                            <v-row justify="center">
                                <v-dialog v-model="dialogEditProfile" persistent max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="orange" dark v-on="on">Edit Profile</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Edit Profile</span>
                                        </v-card-title>
                                        <div class="mx-8" v-if="errorFlag3" style="color: red;">
                                            {{ error3 }}
                                        </div>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                                v-model="edit.name"
                                                                label="Name"
                                                                :error-messages="nameErrors"
                                                                @input="$v.edit.name.$touch()"
                                                                @blur="$v.edit.name.$touch()"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                                v-model="edit.email"
                                                                label="Email"
                                                                type="email"
                                                                :error-messages="emailErrors"
                                                                @input="$v.edit.email.$touch()"
                                                                @blur="$v.edit.email.$touch()"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-text-field
                                                                v-model="edit.city"
                                                                label="City"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-text-field
                                                                v-model="edit.country"
                                                                label="Country"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-text-field
                                                                v-model="edit.currentPassword"
                                                                label="Current Password"
                                                                type="password"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-text-field
                                                                v-model="edit.password"
                                                                label="New Password"
                                                                type="password"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <!--Uploading an image for user-->
                                                        <v-btn class="ma-1" @click="onPickFile('user')">Change image</v-btn>
                                                        <v-btn class="ma-1" color="red white--text" @click="imageUrl = ''">Delete image</v-btn>
                                                        <input
                                                                type="file"
                                                                style="display: none"
                                                                ref="fileInput"
                                                                accept="image/jpeg,image/gif,image/png"
                                                                @change="onFilePicked"
                                                        >
                                                        <v-img v-bind:src="imageUrl" height="70" width="90"></v-img>
                                                    </v-col>
                                                    <!--                                                    </v-form>-->
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <!--Save and close-->
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="dialogEditProfile = false">Close
                                            </v-btn>
                                            <v-btn color="blue darken-1"
                                                   text
                                                   :disabled="this.$v.edit.name.$invalid || this.$v.edit.email.$invalid"
                                                   v-on:click="editProfile"
                                                   type="submit"
                                            >Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>


                        </v-card>

                        <!--Users Petitions-->
                        <v-card
                                class="pa-7 ma-7"
                        >
                            <v-row justify="center">
                                <v-card-title>My Petitions</v-card-title>
                            </v-row>

                            <!--Dialog pop up for creating a new petition-->
                            <v-row justify="center">
                                <v-dialog v-model="dialog" persistent max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="orange" dark v-on="on">Create new petition</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">New Petition</span>
                                        </v-card-title>
                                        <div class="mx-8" v-if="errorFlag2" style="color: red;">
                                            {{ error2 }}
                                        </div>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                                v-model="form.title"
                                                                label="Title*"
                                                                required
                                                                :error-messages="titleErrors"
                                                                @input="$v.form.title.$touch()"
                                                                @blur="$v.form.title.$touch()"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <v-text-field
                                                                v-model="form.description"
                                                                label="Description*"
                                                                required
                                                                :error-messages="descriptionErrors"
                                                                @input="$v.form.description.$touch()"
                                                                @blur="$v.form.description.$touch()"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-select
                                                                v-model="form.categoryId"
                                                                :items="categories"
                                                                item-text="name"
                                                                item-value="categoryId"
                                                                label="Category*"
                                                                required
                                                                :error-messages="categoryErrors"
                                                                @input="$v.form.categoryId.$touch()"
                                                                @blur="$v.form.categoryId.$touch()"
                                                        ></v-select>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-text-field
                                                                v-model="form.closingDate"
                                                                label="Closing Date"
                                                                hint="DD/MM/YYYY format"
                                                                type="date"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <!--Uploading an image for petition-->
                                                        <v-btn @click="onPickFile('petition')">Upload image*</v-btn>
                                                        <input
                                                                type="file"
                                                                style="display: none"
                                                                ref="fileInput"
                                                                accept="image/jpeg,image/gif,image/png"
                                                                @change="onFilePicked"
                                                                required
                                                                :error-messages="petitionImageErrors"
                                                                @close="$v.petitionImageUrl.$touch()"
                                                                @blur="$v.petitionImageUrl.$touch()"
                                                        >
                                                        <div v-if="!this.petitionImageUrl">
                                                            <small>Please upload an image for this petition</small>
                                                        </div>
                                                        <v-img v-bind:src="petitionImageUrl" height="150"></v-img>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                            <small>*indicates required field</small>
                                        </v-card-text>

                                        <!--Save and close-->
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1"
                                                   text @click="dialog = false"
                                            >Close</v-btn>
                                            <v-btn color="blue darken-1"
                                                   text
                                                   :disabled="this.$v.form.title.$invalid || this.$v.form.description.$invalid || this.$v.form.categoryId.$invalid || this.$v.petitionImageUrl.$invalid"
                                                   v-on:click="newPetition"
                                            >Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>

                            <!--Dialog pop up for creating a new petition-->
                            <v-row justify="center">
                                <v-list>
                                    <v-list-item
                                            v-for="petition in petitions"
                                            :key="petition">
                                        <v-list-item-content>
                                            <v-card
                                                    width="500"
                                                    v-on:click="viewPetition(petition.petitionId)"
                                            >
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                                v-text="petition.title"
                                                        ></v-list-item-title>
                                                        <v-list-item-subtitle
                                                                v-text="petition.authorName">
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-card-text>
                                                    {{ petition.signatureCount }} Signatures | {{ petition.category }}
                                                </v-card-text>
                                            </v-card>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {apiPetition, apiUser} from "../api";
    import {validationMixin} from "vuelidate";
    import {email, minLength, required} from "vuelidate/lib/validators";


    const rootUrl = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

    export default {
        mixins: [validationMixin],
        validations: {
            edit: {
                name: {required, minLength: minLength(1)},
                email: {required, email}
            },
            form: {
                title: {required, minLength: minLength(1)},
                description: {required, minLength: minLength(1)},
                categoryId: {required}
            },
            petitionImageUrl: {required}
        },
        data() {
            return {
                error: "",
                errorFlag: false,
                error2: "",
                errorFlag2: false,
                error3: "",
                errorFlag3: false,
                dialog: false,
                dialogEditProfile: false,
                userDetails: [],
                petitions: [],
                categories: [],
                image: null,
                imageUrl: '',
                petitionImage: null,
                petitionImageUrl: '',
                edit: {
                    name: '',
                    email: '',
                    password: '',
                    currentPassword: '',
                    city: '',
                    country: '',
                },
                form: {
                    title: '',
                    description: '',
                    categoryId: '',
                    closingDate: '',
                }
            }
        },
        mounted: function () {
            this.getUser();
            this.getPetitions();
            this.getCategories();
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.edit.name.$dirty) return errors;
                !this.$v.edit.name.minLength && errors.push('Name must be at least 1 characters long');
                !this.$v.edit.name.required && errors.push('Name is required.');
                return errors
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.edit.email.$dirty) return errors;
                !this.$v.edit.email.email && errors.push('Must be valid e-mail');
                !this.$v.edit.email.required && errors.push('E-mail is required');
                return errors;
            },
            titleErrors() {
                const errors = [];
                if (!this.$v.form.title.$dirty) return errors;
                !this.$v.form.title.minLength && errors.push('Title must be at least 1 character long');
                !this.$v.form.title.required && errors.push('Title is required.');
                return errors
            },
            descriptionErrors() {
                const errors = [];
                if (!this.$v.form.description.$dirty) return errors;
                !this.$v.form.description.minLength && errors.push('Description must be at least 1 character long');
                !this.$v.form.description.required && errors.push('Description is required.');
                return errors
            },
            categoryErrors() {
                const errors = [];
                if (!this.$v.form.categoryId.$dirty) return errors;
                !this.$v.form.categoryId.required && errors.push('Category is required.');
                return errors
            },
            petitionImageErrors() {
                const errors = [];
                if (!this.$v.petitionImageUrl.$dirty) return errors;
                !this.$v.petitionImageUrl.required && errors.push('Image is required.');
                return errors
            },
        },
        methods: {
            getUser() {
                apiUser.getUser()
                    .then((response) => {
                        this.userDetails = response.data;
                        this.edit.name = this.userDetails.name;
                        this.edit.email = this.userDetails.email;
                        this.edit.city = this.userDetails.city;
                        this.edit.country = this.userDetails.country;
                        this.imageUrl = this.userPhoto();
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getPetitions() {
                apiPetition.getUserPetitions()
                    .then((response) => {
                        this.petitions = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            viewPetition(petitionId) {
                this.$router.push({path: "/petitions/" + petitionId});
            },
            userPhoto() {
                return rootUrl + "users/" + localStorage.getItem('userId') + "/photo";
            },
            getCategories() {
                apiPetition.getAllCategories()
                    .then((response) => {
                        this.categories = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            clearPetitionForm() {
                this.form.title = '';
                this.form.description = '';
                this.form.categoryId = '';
                this.form.closingDate = '';
                this.petitionImage = null;
                this.petitionImageUrl = '';
            },
            signPetition(petitionId) {
                apiPetition.addSignature(petitionId)
                    .then(() => {
                        this.getPetitions();
                        this.getUser();
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            newPetition() {
                let formRequest = {
                    title: this.form.title,
                    description: this.form.description,
                    categoryId: this.form.categoryId
                };
                if (this.form.closingDate) {
                    const [year, month, day] = this.form.closingDate.split('-');
                    formRequest.closingDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
                apiPetition.createPetition(formRequest)
                    .then((response) => {
                        if (this.petitionImage !== null) {
                            this.setPetitionPhoto(response.data.petitionId, this.petitionImage);
                        }
                        this.signPetition(response.data.petitionId);
                        this.dialog = false;
                        this.clearPetitionForm();
                    }).catch((error) => {
                        console.log(error);
                        if (error.response.statusText === 'Bad Request: closingDate must be in the future') {
                            this.error2 = "Closing date must be in the future";
                            this.errorFlag2 = true;
                        } else if (error.response.statusText === 'Bad Request: data.categoryId should be integer') {
                            this.error2 = "Please enter a valid category";
                            this.errorFlag2 = true;
                        } else {
                            this.error2 = error.response.statusText;
                            this.errorFlag2 = true;
                        }
                });
                this.getPetitions();
            },
            setPetitionPhoto(petitionId, image) {
                apiPetition.setPhoto(petitionId, image).then(() => {
                }).catch((error) => {
                        console.log(error);
                    }
                );
            },
            setUserPhoto(userId, image) {
                apiUser.setPhoto(userId, image).then(() => {
                }).catch((error) => {
                        console.log(error);
                    }
                );
            },
            onPickFile() {
                this.$refs.fileInput.click();
            },
            onFilePicked(event, type) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file');
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    if (type === 'petition') {
                        this.petitionImageUrl = fileReader.result;
                    } else {
                        this.imageUrl = fileReader.result;
                    }
                });
                fileReader.readAsDataURL(files[0]);
                if (type === 'petition') {
                    this.petitionImage = files[0];
                } else {
                    this.image = files[0];
                }
            },
            deleteUserPhoto(userId) {
                apiUser.deletePhoto(userId)
                    .then(() => {
                    })
                    .catch((error) => {
                        this.error3 = error.response.statusText;
                        this.errorFlag3 = true;
                    })
            },
            editProfile() {
                let editRequest = {};
                if (this.edit.name) editRequest.name = this.edit.name;
                if (this.edit.email) editRequest.email = this.edit.email;
                if (this.edit.city) editRequest.city = this.edit.city;
                if (this.edit.country) editRequest.country = this.edit.country;
                if (this.edit.password) editRequest.password = this.edit.password;
                if (this.edit.currentPassword) editRequest.currentPassword = this.edit.currentPassword;

                apiUser.editUser(editRequest, localStorage.getItem('userId'))
                    .then(() => {
                        if (this.imageUrl === '') {
                            this.deleteUserPhoto(localStorage.getItem('userId'))
                        } else {
                            this.setUserPhoto(localStorage.getItem('userId'), this.image)
                        }
                        this.getUser();
                        this.getPetitions();
                        this.dialogEditProfile = false;
                    })
                    .catch((error) => {
                        if (error.response.statusText === "Bad Request: incorrect password") {
                            this.error3 = "Current password is incorrect";
                            this.errorFlag3 = true;
                        } else {
                            this.error3 = error.response.statusText;
                            this.errorFlag3 = true;
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>