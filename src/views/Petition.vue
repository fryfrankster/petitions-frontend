<template>
    <div class="single-petition">
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-card>
                        <v-row justify="center" class="mx-1">
                            <v-list-item>
                                <v-list-item-avatar color="orange">-->
                                    <v-img
                                            v-bind:src="userPhoto(petition.authorId)"
                                            lazy-src="https://cloud.filmfed.com/default/avatars/l_default_orange.png"
                                    >
                                    </v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{ petition.title }}</v-list-item-title>
                                    <v-list-item-subtitle>by {{ petition.authorName }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                        </v-row>
                        <v-img
                                max-height="500"
                                v-bind:src="petitionPhoto"
                        >
                        </v-img>
                        <div class="pa-8">
                            <v-card-text v-if="petition.authorCity">
                                <b>City:</b> {{ petition.authorCity }}
                            </v-card-text>
                            <v-card-text v-if="petition.authorCountry">
                                <b>Country:</b> {{ petition.authorCountry }}
                            </v-card-text>
                            <v-card-text>
                                <b>Category:</b> {{ petition.category }}
                            </v-card-text>
                            <v-card-text>
                                <b>Created on:</b> {{ petition.createdDate }}
                            </v-card-text>
                            <v-card-text>
                                <b>Closing on:</b> {{ closingDate }}
                            </v-card-text>
                            <v-card-text>
                                {{ petition.description }}
                            </v-card-text>
                        </div>
                        <div class="ma-5">
                            <v-row justify="center">
                                <b>SHARE THIS PETITION TO OTHERS</b>
                            </v-row>
                            <v-row justify="center">
                                <a :href="'mailto:' + emailUrl" target="_blank" class="ma-1" style="text-decoration:none">
                                    <v-btn>Email</v-btn>
                                </a>
                                <a :href="twitterURL" target="_blank" class="ma-1" style="text-decoration:none">
                                    <v-btn color="blue white--text">Twitter</v-btn>
                                </a>
                                <a :href="redditUrl" target="_blank" class="ma-1" style="text-decoration:none">
                                    <v-btn color="red white--text">Reddit</v-btn>
                                </a>
                            </v-row>
                        </div>

                        <div>
                            <v-row justify="center">
                                {{ petition.signatureCount }} people have signed this petition
                            </v-row>
                        </div>
                        <!--Signing petition or deleting if they are the creator-->
                        <v-card-actions>
                            <v-row justify="center">
                                <div v-if="creator">
                                    <v-dialog v-model="dialogEditPetition" persistent max-width="600px">
                                        <template v-slot:activator="{ on }">
                                            <v-btn color="orange" dark v-on="on">Edit Petition</v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">Edit Petition</span>
                                            </v-card-title>
                                            <div v-if="errorFlag2" style="color: red;">
                                                {{ error2 }}
                                            </div>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field
                                                                    v-model="edit.title"
                                                                    label="Name"
                                                            ></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12">
                                                            <v-textarea
                                                                    v-model="edit.description"
                                                                    label="Description"
                                                            ></v-textarea>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select
                                                                    v-model="edit.categoryId"
                                                                    :items="categories"
                                                                    item-text="name"
                                                                    item-value="categoryId"
                                                                    label="Category"
                                                            ></v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field
                                                                    v-model="edit.closingDate"
                                                                    label="Closing Date"
                                                                    hint="DD/MM/YYYY format"
                                                                    type="date"
                                                            ></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12">
                                                            <!--Uploading an image for petition-->
                                                            <v-btn @click="onPickFile">Change image</v-btn>
                                                            <input
                                                                    type="file"
                                                                    style="display: none"
                                                                    ref="fileInput"
                                                                    accept="image/jpeg,image/gif,image/png"
                                                                    @change="onFilePicked"
                                                                    required
                                                            >
                                                            <v-img v-bind:src="imageUrl" height="70" width="90"></v-img>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <!--Save and close-->
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="dialogEditPetition = false">
                                                    Close
                                                </v-btn>
                                                <v-btn color="blue darken-1" text v-on:click="editPetition">Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                    <v-btn
                                            color="red white--text"
                                            class="ma-1"
                                            v-on:click="removePetition"
                                    >
                                        Delete Petition
                                    </v-btn>
                                </div>
                                <div v-else>
                                    <div v-if="alreadySigned">
                                        <v-btn v-on:click="unSignPetition"
                                               color="red white--text"
                                        >
                                            Remove Signature
                                        </v-btn>
                                    </div>
                                    <div v-else>
                                        <v-btn v-on:click="signPetition" color="orange white--text">
                                            Sign Petition
                                        </v-btn>
                                    </div>
                                </div>
                            </v-row>
                        </v-card-actions>
                        <!--List of signatures-->
                        <v-list>
                            <v-list-item
                                    v-for="signature in signatures"
                                    :key="signature">
                                <v-list-item-content>
                                    <v-card
                                            max-width="520"
                                            class="mx-auto"
                                    >
                                        <v-list-item>
                                            <v-list-item-avatar color="orange">
                                                <v-img
                                                        v-bind:src="userPhoto(signature.signatoryId)"
                                                        lazy-src="https://cloud.filmfed.com/default/avatars/l_default_orange.png"
                                                >
                                                </v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title
                                                        v-text="signature.name"
                                                ></v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{ signature.city }} | {{ signature.country }}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-card>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {apiPetition} from "../api";

    const rootUrl = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

    export default {
        name: "Petition",
        data() {
            return {
                error: "",
                errorFlag: false,
                error2: "",
                errorFlag2: false,
                dialogEditPetition: false,
                petition: [],
                signatures: [],
                categories: [],
                image: null,
                imageUrl: '',
                edit: {
                    title: '',
                    description: '',
                    categoryId: '',
                    closingDate: '',
                },
                twitterURL: "https://twitter.com/intent/tweet?text=Check out this Petition:" +
                    "&hashtags=petition&url=" + "http://localhost:8080/petitions/" + this.$route.params.id,
                emailUrl: "?body=Check out this Petition " + window.location.href,
                redditUrl: " http://www.reddit.com/submit?url=Check out this petition! " + window.location.href,
            }
        },
        mounted: function () {
            this.getCategories();
            this.getPetition();
            this.getSignatures();
        },
        computed: {
            petitionPhoto: function () {
                return rootUrl + "petitions/" + this.$route.params.id + "/photo";
            },
            alreadySigned: function () {
                let hasSigned = false;
                for (let i = 0; i < this.signatures.length; i++) {
                    if (this.signatures[i].signatoryId == localStorage.getItem('userId')) {
                        hasSigned = true;
                        break;
                    }
                }
                return hasSigned;
            },
            creator: function () {
                return this.petition.authorId == localStorage.getItem('userId');
            },
            closingDate: function () {
                if (this.petition.closingDate) {
                    return this.petition.closingDate
                }
                return "No closing date specified"
            }
        },
        methods: {
            getPetition() {
                apiPetition.getOnePetition(this.$route.params.id)
                    .then((response) => {
                        this.petition = response.data;

                        // Setting values for the edit dialog box
                        this.edit.title = this.petition.title;
                        this.edit.description = this.petition.description;
                        this.edit.categoryId = this.getCategoryIdByName(this.petition.category);
                        this.edit.closingDate = this.petition.closingDate;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getCategoryIdByName(categoryName) {
                let categoryId = -1;
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].name === categoryName) {
                        categoryId = this.categories[i].categoryId;
                        break;
                    }
                }
                return categoryId;
            },
            editPetition() {
                let request = {};
                if (this.edit.title) request.title = this.edit.title;
                if (this.edit.description) request.description = this.edit.description;
                if (this.edit.categoryId) request.categoryId = this.edit.categoryId;
                if (this.edit.closingDate) {
                    const [year, month, day] = this.form.closingDate.split('-');
                    request.closingDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
                apiPetition.updatePetition(this.$route.params.id, request)
                    .then(() => {
                        this.getPetition();
                        this.dialogEditPetition = false;
                    })
                    .catch((error) => {
                        if (error.response.statusText === 'Bad Request: closingDate must be in the future') {
                            this.error2 = "Closing date must be in the future";
                            this.errorFlag2 = true;
                        } else {
                            this.error2 = error.response.statusText;
                            this.errorFlag2 = true;
                        }
                    });
            },
            signPetition() {
                if (!this.$store.state.isLoggedIn) {
                    this.$router.push({path: '/Register'});
                    return;
                }
                apiPetition.addSignature(this.petition.petitionId)
                    .then(() => {
                        this.getPetition();
                        this.getSignatures();
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            unSignPetition() {
                apiPetition.removeSignature(this.petition.petitionId)
                    .then(() => {
                        this.getPetition();
                        this.getSignatures();
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getSignatures() {
                apiPetition.getSignatures(this.$route.params.id)
                    .then((response) => {
                        this.signatures = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
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
            userPhoto(signatoryId) {
                return rootUrl + "users/" + signatoryId + "/photo";
            },
            removePetition() {
                apiPetition.deletePetition(this.petition.petitionId)
                    .then(() => {
                        this.$router.push({path: '/petitions'});
                    })
                    .catch((error) => {
                        console.log(error);
                    })
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
                    this.imageUrl = fileReader.result;
                });
                fileReader.readAsDataURL(files[0]);
                this.image = files[0];
            },
            deleteUserPhoto() {
            }
        }
    }
</script>

<style scoped>

</style>