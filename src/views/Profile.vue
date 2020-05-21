<template>
    <div class="profile">
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-col>
                        <v-card class="pa-7 ma-7">
                            <v-row justify="center">
                                <v-avatar color="orange" size="150">
                                    <v-img
                                            v-bind:src="userPhoto(this.$route.params.id)"
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
                                <v-card-text>
                                    {{ userDetails.city }} {{ userDetails.country }}
                                </v-card-text>
                            </v-row>
                        </v-card>

                        <v-card class="pa-7 ma-7">
                            <v-row justify="center">
                                <v-card-title>My Petitions</v-card-title>
                            </v-row>
                            <v-row justify="center">
                                <v-dialog v-model="dialog" persistent max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="orange" dark v-on="on">Create new petition</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">New Petition</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                                v-model="form.title"
                                                                label="Title*"
                                                                required
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <v-text-field
                                                                v-model="form.description"
                                                                label="Description*"
                                                                required
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
                                                        ></v-select>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-text-field
                                                                v-model="form.closingDate"
                                                                label="Closing Date*"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <!--Uploading an image for petition-->
                                                        <v-btn @click="onPickFile">Upload image</v-btn>
                                                        <input
                                                                type="file"
                                                                style="display: none"
                                                                ref="fileInput"
                                                                accept="image/*"
                                                                @change="onFilePicked"
                                                        >
                                                        <v-img v-bind:src="petitionImageUrl" height="150"></v-img>
                                                    </v-col>

                                                </v-row>
                                            </v-container>
                                            <small>*indicates required field</small>
                                        </v-card-text>

                                        <!--Save and close-->
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" text v-on:click="newPetition">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                            <v-row justify="center">
                                <v-list>
                                    <v-list-item
                                            v-for="petition in petitions"
                                            :key="petition">
                                        <v-list-item-content>
                                            <v-card
                                                    max-width="520"
                                                    class="mx-auto"
                                            >
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                                v-text="petition.title"
                                                                @click="viewPetition(petition.petitionId)"
                                                        ></v-list-item-title>
                                                        <v-list-item-subtitle
                                                                v-text="petition.authorName">
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-card-text>{{ petition.signatureCount }} Signatures | {{
                                                    petition.category }}
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

    const rootUrl = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

    export default {
        name: "Profile",
        data() {
            return {
                error: "",
                errorFlag: false,
                dialog: false,
                userDetails: [],
                petitions: [],
                categories: [],
                petitionImage: null,
                petitionImageUrl: '',
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
        },
        methods: {
            getUser() {
                apiUser.getUser()
                    .then((response) => {
                        this.userDetails = response.data;
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
            userPhoto(userId) {
                return rootUrl + "users/" + userId + "/photo";
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
            newPetition() {
                let formRequest = {
                    title: this.form.title,
                    description: this.form.description,
                    categoryId: this.form.categoryId
                };
                if (this.form.closingDate) formRequest.closingDate = this.form.closingDate;

                apiPetition.createPetition(formRequest)
                    .then((response) => {
                        console.log(response.data);
                        this.newPetition();
                    }).catch();
            },
            onPickFile() {
                this.$refs.fileInput.click();
            },
            onFilePicked(event) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file');
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.petitionImageUrl = fileReader.result;
                });
                fileReader.readAsDataURL(files[0]);
                this.petitionImage = files[0];
            },
        }
    }
</script>

<style scoped>

</style>