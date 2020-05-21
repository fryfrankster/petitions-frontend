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

                        <v-card-actions>
                            <v-row justify="center">
                                <v-btn v-on:click="signPetition">
                                    Sign Petition
                                </v-btn>
                                <v-btn v-on:click="unSignPetition">
                                    Remove Signature
                                </v-btn>
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
                apiPetition.signPetition(this.petition.petitionId)
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
            // alreadySigned() {
            //     this.hasSigned = this.signatures.find(signature => signature.signatoryId = localStorage.getItem('userId')).length === 1;
            //         console.log(this.hasSigned);
            // },
        }
    }
</script>

<style scoped>

</style>