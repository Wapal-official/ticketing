<template>
  <div class="tw-w-full tw-h-full tw-py-4 tw-px-4">
    <div
      class="tw-w-full tw-mx-auto tw-px-4 tw-py-4 tw-border tw-border-solid tw-border-dark-6 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 md:tw-w-1/2 lg:tw-w-[40%]"
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center"
      >
        <h1 class="tw-text-2xl tw-text-white tw-font-semibold">Loonies</h1>
        <div class="tw-text-white tw-text-sm">
          Would you like to link your wallet to
          <span class="tw-text-primary-1">{{ user.username }}</span> ?
        </div>
      </div>
      <reusable-connect-wallet />
      <div
        class="tw-w-full tw-border tw-border-solid tw-border-dark-6 tw-rounded tw-p-4 tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-6"
        v-for="(role, index) in roles"
        :key="index"
      >
        <div
          :class="[
            { 'tw-bg-utility-green': role.id === currentRole },
            { 'tw-bg-utility-red': role.id !== currentRole },
          ]"
          class="tw-p-2 tw-rounded-full"
        ></div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-gap-1 tw-items-start tw-justify-start"
        >
          <h2 class="tw-text-base tw-text-white tw-font-medium">
            {{ role.name }}
          </h2>
          <div class="tw-text-white tw-text-sm">
            {{ role.description }}
          </div>
        </div>
      </div>
      <button-primary
        title="Authorize"
        @click="authorize"
        :loading="authorizing"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
<script>
import {
  getHeldLooniesOfUser,
  assignRole,
  signVerificationMessage,
} from "@/services/HolderVerificationService";
export default {
  data() {
    return {
      user: { username: "", id: "" },
      roles: [
        {
          name: "Junior Loonie",
          description: "Hold 1-5 Loonies",
          id: "1250340459025399868",
        },
        {
          name: "Senior Loonie",
          description: "Hold 6-10 Loonies",
          id: "1250340914426286180",
        },
        {
          name: "Elite Loonie",
          description: "Hold 11-15 Loonies",
          id: "1250344236365381642",
        },
        {
          name: "Legendary Loonie",
          description: "Hold 16-20 Loonies",
          id: "1250341411681734678",
        },
        {
          name: "Mad Loonie",
          description: "Hold 20+ Loonies",
          id: "1250341818982338592",
        },
      ],
      currentRole: "",
      authorizing: false,
      heldTokens: 0,
    };
  },
  mounted() {
    this.user.username = this.$route.query.username;
    this.user.id = this.$route.query.id;
    this.getHeldLooniesOfUser();
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    disabled() {
      return !this.heldTokens;
    },
  },
  watch: {
    walletAddress() {
      this.heldTokens = 0;
      if (this.walletAddress) {
        this.getHeldLooniesOfUser();
      }
    },
  },
  methods: {
    async authorize() {
      try {
        this.authorizing = true;

        await signVerificationMessage();

        const res = await assignRole({
          id: this.user.id,
          role_id: this.currentRole,
        });

        const assignedRole = this.roles.find(
          (role) => role.id === this.currentRole
        );

        this.$toast.showMessage({
          message: `${assignedRole.name} Role Assigned Successfully`,
        });

        this.authorizing = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({
          message: error,
          error: true,
        });
        this.authorizing = false;
      }
    },
    async getHeldLooniesOfUser() {
      if (this.walletAddress) {
        this.heldTokens = await getHeldLooniesOfUser({
          walletAddress: this.walletAddress,
        });

        this.assignRoleBasedOnHeldTokens();
      }
    },
    assignRoleBasedOnHeldTokens() {
      if (this.heldTokens >= 20) {
        this.currentRole = "1250341818982338592";
      } else if (this.heldTokens >= 16 && this.heldTokens <= 20) {
        this.currentRole = "1250341411681734678";
      } else if (this.heldTokens >= 11 && this.heldTokens <= 15) {
        this.currentRole = "1250344236365381642";
      } else if (this.heldTokens >= 6 && this.heldTokens <= 10) {
        this.currentRole = "1250344236365381642";
      } else if (this.heldTokens >= 1 && this.heldTokens < 5) {
        this.currentRole = "1250340459025399868";
      } else {
        this.currentRole = "";
      }
    },
  },
};
</script>
