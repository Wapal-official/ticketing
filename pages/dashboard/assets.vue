<template>
    <div class="tw-w-full md:tw-px-16 lg:tq-px-0">
        <button class="dashboard-gradient-button">Create New folder <v-icon class="mdi mdi-plus"></v-icon></button>
        <h2 class="tw-text-lg">Folders</h2>
        <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
            <button
                class="tw-px-2 tw-py-2 tw-bg-[#A0A0A0] tw-font-semibold tw-rounded tw-flex tw-flex-row tw-items-center tw-gap-4"
                @click.prevent=""><v-icon class="mdi mdi-folder" color="#000"></v-icon> Upload Folder <v-icon
                    class="mdi mdi-dots-vertical" color="#000"></v-icon>
                <!-- <v-progress-circular undetermine color="000"></v-progress-circular> -->
            </button>
            <button
                class="tw-px-2 tw-py-2 tw-bg-[#A0A0A0] tw-font-semibold tw-rounded tw-flex tw-flex-row tw-items-center tw-gap-4"
                @click.prevent=""><v-icon class="mdi mdi-folder" color="#000"></v-icon> Upload File <v-icon
                    class="mdi mdi-dots-vertical" color="#000"></v-icon>
                <!-- <v-progress-circular undetermine color="000"></v-progress-circular> -->
            </button>
        </div>
        <!-- <v-file-input multiple label="File input"></v-file-input> -->
    </div>
</template>

<script>
export default {
    layout: "dashboard",
    data() {
        return {
        };
    },
}
</script>

<style lang="ts">

</style>
