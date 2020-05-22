<template>
    <div class="single-petition">
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-card>
                        <v-row justify="center">
                            <v-card-title>{{ petition.title }}</v-card-title>
                        </v-row>

                        <v-img
                                max-height="500"
                                v-bind:src="petitionPhoto"
                        >
                        </v-img>
                        <v-card-text text>
                            {{ petition.description }}
                        </v-card-text>
                        <v-card-text>
                            Created on {{ petition.createdDate }} | Closing on {{ petition.closingDate }}
                        </v-card-text>
                        <v-card-text>
                            {{ petition.category }}
                        </v-card-text>
                        <v-card-text>
                            {{ petition.signatureCount }}
                        </v-card-text>

                        <!--Signing petition or deleting if they are the creator-->
                        <v-card-actions>
                            <v-row justify="center">

                                <div v-if="creator">
                                    <v-btn
                                            class="ma-1"
                                    >
                                        Edit Petition
                                    </v-btn>
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
                                        <v-btn v-on:click="unSignPetition" color="orange white--text">
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
                petition: [],
                signatures: [],
            }
        },
        mounted: function () {
            this.getPetition();
            this.getSignatures();
        },
        computed: {
            petitionPhoto: function () {
                return rootUrl + "petitions/" + this.petition.petitionId + "/photo";
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
            }
        },
        methods: {
            getPetition() {
                apiPetition.getOnePetition(this.$route.params.id)
                    .then((response) => {
                        this.petition = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            signPetition() {
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
            }
        }
    }
</script>

<style scoped>

</style>