<template>
    <div  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
  >
    <label
      v-if="label"
      class="tw-text-white tw-text-sm tw-font-medium"
      :class="
        required
          ? `after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2`
          : ''
      "
      >{{ label }}</label>
        <div id="app" class="v-input  wapal-input tw-w-full v-textarea v-textarea--auto-grow v-textarea--no-resize v-input--hide-details theme--dark v-text-field v-text-field--single-line v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder">
            <vue-editor v-model="internalValue" :editor-toolbar="customToolbar"></vue-editor>
        </div>
    </div>
  </template>
  

  <script>
    import { VueEditor } from 'vue2-quill-editor'
    export default {
<script>
  import { VueEditor } from 'vue2-quill-editor'
  export default {


<style lang="css">
  .ql-container.ql-snow{ border: none !important;}
  .ql-toolbar .ql-stroke {
      fill: none;
      stroke: #e5e7eb;
  }

  .ql-toolbar .ql-fill {
      fill: #e5e7eb;
  }

  .ql-toolbar .ql-picker {
      color: #e5e7eb;
  }

  .ql-toolbar .ql-picker .ql-picker-options{
      color: #0b0c0d;
  }
  .ql-toolbar.ql-snow {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid rgb(56 58 63 / var(--tw-border-opacity));
  }
.ql-tooltip.ql-editing{
    left: 0px !important;
    /* transform: translateY(10px) translateX(50%); */
  }

  .ql-editor {
    font-style: normal;
  }

.ql-editor em {
    font-style: italic;
  }
  .ql-editor em u, .ql-editor u em {
    font-style: italic !important;
    }
    .ql-toolbar.ql-snow {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid rgb(56 58 63 / var(--tw-border-opacity));
    }
  .ql-tooltip.ql-editing{
      left: 0px !important;
      /* transform: translateY(10px) translateX(50%); */
    }

    .ql-editor {
      font-style: normal;
    }

  .ql-editor em {
      font-style: italic;
    }
</style>


