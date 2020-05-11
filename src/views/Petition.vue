<template>
    <div class="single-petition">
        <v-card>
            <v-card-title>{{ petition.title }}</v-card-title>
            <v-avatar color="grey">{{ petition.author }}</v-avatar>
            <v-card-text>{{ petition.description }}</v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {apiPetition} from "../api";

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
            }
        }
    }
</script>

<style scoped>

</style>