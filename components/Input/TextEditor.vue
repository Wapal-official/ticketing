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

props: {
      value: {
      type: [String, Number],
      },
      placeholder: {
      type: String,
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
      readOnly: {
      type: Boolean,
      default: false,
      },
      background: {
      type: String,
      },
      disabled: {
      type: Boolean,
      default: false,
      },
      required: {
      type: Boolean,
      default: false,
      },
      label: {
      type: String,
      },
 },

 
  components: {
     VueEditor
  },
  computed: {
      
  internalValue: {
    get() {
      return this.value;  // Added to ensure binding with v-model
          },
    set(newValue) {
      this.$emit('input', newValue);  // Emit changes to parent component
          },
      },
  },

  data: () =>  ({
        content: 'Hello', 
        customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
         [{ 'header': [1, 2, 3, 4, 5, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link'],
        ['clean']
      ],  
    }),

  watch: {
      content(newValue) {
      console.log('Updated:', newValue);
      }
  },
  };
</script> 

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
</style>


