<template>
  <div
    class="flex flex-col items-center justify-start gap-6 rounded px-8 py-8 faq-card text-white"
  >
    <h4 class="text-base"><slot name="question"></slot></h4>
    <p>
      <slot name="answer"></slot>
    </p>
  </div>
</template>
