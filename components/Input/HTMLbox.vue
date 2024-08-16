<template>
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full">
      <label
        v-if="label"
        class="tw-text-white tw-text-sm tw-font-medium"
        :class="
          required
            ? `after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2`
            : ''
        "
      >{{ label }}</label>
      <div
        id="app"
        class="v-input wapal-input tw-w-full v-textarea v-textarea--auto-grow v-textarea--no-resize v-input--hide-details theme--dark v-text-field v-text-field--single-line v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder"
      >
        <vue-editor v-model="internalValue" :editor-toolbar="customToolbar" ref="editor"></vue-editor>
      </div>
      <div class="info-panel v-input wapal-input tw-w-full v-textarea v-textarea--auto-grow v-textarea--no-resize v-input--hide-details theme--dark v-text-field v-text-field--single-line v-text-field--is-booted v-text-field--enclosed ">
        <code>
        <div class="info-item">
        <span><strong>Cursor Position:</strong> {{ cursorPosition }}</span>
    </div>
    <div class="info-item">
        <span><strong>Selected Text:</strong> {{ selectedText }}</span>
    </div>
    <div class="info-item">
        <span><strong>Contents:</strong> {{ internalValue }}</span>
    </div>
    <div class="info-item">
        <strong>Rendered HTML:</strong>
        <div v-html="internalValue"></div>
      </div>
      </code>
      </div>
    </div>
  </template>
  
  <script>
  import { VueEditor } from "vue2-quill-editor";
  
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
      VueEditor,
    },
  
    data: () =>  ({
        content: 'Hello', 
        cursorPosition: 0,
        selectedText: '',
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
  
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit("input", newValue);
        },
      },
    },
    watch: {
      content(newValue) {
        console.log("Updated:", newValue);
      },
    },
  
    mounted() {
      const quill = this.$refs.editor.quill;
  
      quill.on("selection-change", (range) => {
        if (range) {
          if (range.length === 0) {
            console.log("User cursor is on", range.index);
            this.cursorPosition = range.index;
          } else {
            var text = quill.getText(range.index, range.length);
            console.log("User has highlighted", text);
            this.selectedText = text;
          }
        } else {
          console.log("Not in focus");
          this.cursorPosition = "N/A";
          this.selectedText = "N/A";
        }
      });
    },
  };
  </script>
  
  <style lang="css">
  .ql-container.ql-snow {
    border: none !important;
  }
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
  .ql-toolbar .ql-picker .ql-picker-options {
    color: #0b0c0d;
  }
  .ql-toolbar.ql-snow {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid rgb(56 58 63 / var(--tw-border-opacity));
  }
  
  .info-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #2b2b2b; /* Adjust color as needed */
    border-radius: 5px;
}
  </style>
  