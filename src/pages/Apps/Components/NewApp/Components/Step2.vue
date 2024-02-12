<script setup lang="ts">
import Card from "@/common/components/Card/index.vue";
import TimerIcon from "@/common/Icons/TimerIcon.vue";
import Button from "@/common/components/Button/index.vue";
import LeftArrowIcon from "@/common/Icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/common/Icons/RightArrowIcon.vue";
import LoaderIcon from "@/common/Icons/LoaderIcon.vue";

const { handleData } = defineProps({
  handleData: Function,
  previousStep: Function,
  isLoading: Boolean,
});
</script>

<template>
  <div class="mt-4">
    <Card width="full" :justify-content="isLoading ? 'center' : 'start'">
      <template v-slot:card-body>
        <div class="flex justify-center items-center p-5" v-if="isLoading">
          <LoaderIcon color="#1C64F2CC" size="20px" />
        </div>
        <div v-else class="grid gap-2">
          <div class="font-normal text-lg">
            Get started with SocialAuth WhatsApp Integration
          </div>
          <div class="flex gap-2">
            <span><TimerIcon /></span>
            <span>Estimated setup time: 3 minutes</span>
          </div>
          <div>
            By using whatsapp with SocialAuth, you agree to our
            <a href="" class="text-blue-600 hover:underline"
              >Acceptable Use Policy</a
            >.
          </div>
        </div></template
      >
    </Card>
    <div class="py-3 flex - gap-2">
      <Button
        variant="primary"
        type="button"
        text="Back"
        :disabled="isLoading"
        :on-click="previousStep"
        ><template v-slot:left-icon>
          <LeftArrowIcon />
        </template>
      </Button>
      <Button
        variant="primary"
        :disabled="isLoading"
        type="button"
        text="Next Step"
        :on-click="() => handleData && handleData({}, 2)"
        ><template v-slot:right-icon>
          <RightArrowIcon />
        </template>
      </Button>
    </div>
  </div>
</template>
