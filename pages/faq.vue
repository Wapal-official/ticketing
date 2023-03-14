<template>
  <div class="tw-bg-wapal-background tw-w-full tw-pb-8">
    <div
      class="tw-w-4/5 tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <h3
        class="tw-text-wapal-pink tw-text-xl md:tw-text-[28px] tw-pb-16 tw-font-medium"
      >
        Frequently Asked Questions
      </h3>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 lg:tw-px-16"
      >
        <faq-card>
          <template #question> 1. What is Wapal? </template>
          <template #answer>
            Wapal is a No Code Creator Studio and Launchpad on Aptos. Wapal is
            developed by Mokshya, an open-source protocol that builds smart
            contract solutions for various Blockchains.
          </template>
        </faq-card>
        <faq-card>
          <template #question>
            2. Why did you decide to build a creator studio and a
            launchpad?</template
          >
          <template #answer>
            <p>
              We decided to build a creator studio to help creators build NFT
              projects without any coding knowledge. We know how difficult and
              costly it is to launch NFT projects on your own.
            </p>
            <p class="tw-py-2">
              We decided to build a launchpad to disrupt the monopoly of
              marketplaces. Marketplaces only allow a few selected NFT projects
              to launch. We'll allow everyone to launch NFT projects.
            </p>
          </template>
        </faq-card>
        <faq-card>
          <template #question>
            3. Who can launch NFT projects from your Launchpad?</template
          >
          <template #answer>
            Anyone can launch NFT projects from our launchpad. There is no
            restriction of any kind to launch on Wapal.
          </template>
        </faq-card>
        <faq-card>
          <template #question>
            4. How will you determine which one is a good NFT project and which
            one is not?
          </template>
          <template #answer>
            We won't determine if a project is good or bad, we let the users
            determine it. Eventually, it's the users who have to make a decision
            because even the influencers or anyone who endorse NFT projects
            suggest to do your own research (DYOR).
          </template>
        </faq-card>
        <faq-card>
          <template #question> 5. Will there be any fees? </template>
          <template #answer>
            There'll only be 3% fee on every NFT minted through Wapal.
          </template>
        </faq-card>
        <faq-card>
          <template #question>6. What about security? </template>
          <template #answer>
            Our source codes will be open-sourced and the smart contract will be
            audited by top security firm.
          </template>
        </faq-card>
        <faq-card>
          <template #question>7. What is your vision? </template>
          <template #answer>
            Our vision is to build a trustless NFT launchpad and creator studio
          </template>
        </faq-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import FaqCard from "@/components/Landing/Faq/FaqCard.vue";
export default {
  components: { FaqCard },
};
</script>
