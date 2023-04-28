<template>
    <div>
        <v-textarea @input="handleInput" rows="3" auto-grow outlined dense :rules="rules" :placeholder="placeholder" :counter="counter" :type="type" :error-messages="error_messages"></v-textarea>
    </div>
    </template>
    
    <script>
    export default {
        props: {
            rules: {
                type: Array,
                default: [],
            },
            placeholder: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                default: null,
            },
            counter: {
                type: Number,
                default: null,
            },
            error_messages: {
                type: String,
                default: null,
            },
        },
        methods: {
            handleInput(e) {
                this.$emit("input", e);
            },
        },
    };
    </script>
<!--     
    <style>
    .v-input__slot {
        border: 1px solid;
        border-image: linear-gradient(264.44deg, #FE87FF 2.87%, #C202D3 34.05%, #5E0FFF 67.82%, #1905DA 99.15%);
        border-image-slice: 1;
        border-radius:0px !important;
    }
    </style> -->
    