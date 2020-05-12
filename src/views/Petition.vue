<template>
    <div class="single-petition">
        <v-container>
            <v-card>
                <v-card-title>{{ petition.title }}</v-card-title>
                <v-card-text>{{ petition.description }}</v-card-text>
                <v-img
                        v-bind:src="petitionPhoto"
                >
                </v-img>
            </v-card>
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
            }
        },
        mounted: function () {
            this.getPetition();
        },
        computed: {
            petitionPhoto: function () {
                return rootUrl + "petitions/" + this.petition.petitionId + "/photo";
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
        }
    }
</script>

<style scoped>

</style>