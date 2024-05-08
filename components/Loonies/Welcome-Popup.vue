<template>
  <div
    class="tw-w-screen tw-h-screen tw-absolute tw-top-0 tw-left-0 tw-bg-black tw-bg-opacity-[85%] tw-z-[999] tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-1 md:tw-px-4 xl:tw-px-0"
  >
    <div class="tw-relative tw-w-full xl:tw-w-[1200px] xl:tw-h-[476px]">
      <img :src="ticketFrame" alt="Ticket Frame" />
      <div
        class="tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-pt-[20px] tw-pb-[20px] tw-pl-[10px] tw-pr-4 tw-flex tw-flex-col tw-items-center tw-justify-start md:tw-pl-[20px]"
      >
        <div
          class="tw-w-full tw-h-full tw-relative tw-flex tw-flex-col tw-items-start tw-justify-center"
        >
          <button
            class="tw-absolute tw-top-[-16px] tw-right-[-16px] tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end md:tw-top-0 md:tw-left-0"
            @click="closeWelcomePopup"
          >
            <i class="bx bx-x tw-text-loonies-primary tw-text-2xl"></i>
          </button>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-6 tw-pr-2 md:tw-pr-14"
          >
            <div
              class="tw-w-[55%] tw-h-[100px] tw-rounded-xl tw-bg-loonies-primary ticket-gif tw-flex-none md:tw-w-[60%] md:tw-h-[200px] lg:tw-h-[300px] xl:tw-w-[750px] xl:tw-h-[436px]"
            ></div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
            >
              <h1
                class="tw-text-xs tw-font-semibold tw-text-loonies-primary tw-font-oswald tw-uppercase md:tw-font-bold md:tw-text-2xl"
              >
                Mint Your Whitelist Ticket To The Loonies
              </h1>
              <button
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5 !tw-text-white tw-bg-loonies-primary tw-text-[0.5rem] tw-font-medium tw-rounded tw-h-[36px] tw-py-[6px] tw-px-4 md:tw-h-[40px] md:tw-py-[10px] md:tw-text-sm"
                @click="redirectToLooniesMintPage"
              >
                <span>Mint your Ticket</span>
                <i class="bx bx-right-arrow-alt tw-text-xs md:tw-text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ticketFrame from "@/assets/img/loonies/ticket-frame.png";
export default {
  data() {
    return {
      ticketFrame,
    };
  },
  mounted() {
    this.disableBodyOverflow();
  },
  methods: {
    disableBodyOverflow() {
      const body = document.querySelector("html");
      body.style.overflow = "hidden";
    },
    enableBodyOverflow() {
      const body = document.querySelector("html");
      body.style.overflow = "aut";
    },
    closeWelcomePopup() {
      localStorage.setItem("seenWelcomePopup", "true");
      this.enableBodyOverflow();
      this.$emit("closeWelcomePopup");
    },
    redirectToLooniesMintPage() {
      this.closeWelcomePopup();
      this.$router.push(`/nft/loonies`);
    },
  },
};
</script>
<style scoped>
.ticket-gif {
  mask: radial-gradient(circle at -1% 50%, transparent 60px, black 62px);
  background-image: url("@/assets/img/loonies/welcome.gif");
  background-size: cover;
}

@media (max-width: 820px) {
  .ticket-gif {
    mask: radial-gradient(circle at -3% 50%, transparent 36px, black 38px);
  }
}

@media (max-width: 430px) {
  .ticket-gif {
    mask: radial-gradient(circle at -3% 50%, transparent 20px, black 22px);
  }
}
</style>
