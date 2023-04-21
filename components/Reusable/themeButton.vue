<template>
    <v-btn color="#FF36AB" :small="small" :loading="loading" @click="$emit('click')" class="text-capitalized">
        {{title}}
    </v-btn>
    </template>
    
    <script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            small: {
                type: Boolean,
                default: false,
            },
        }
    }
    </script>