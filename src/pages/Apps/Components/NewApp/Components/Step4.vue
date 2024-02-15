<script setup lang="ts">
import Card from "@/common/components/Card/index.vue";
import Button from "@/common/components/Button/index.vue";
import LeftArrowIcon from "@/common/Icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/common/Icons/RightArrowIcon.vue";
import LoaderIcon from "@/common/Icons/LoaderIcon.vue";

const { handleData } = defineProps({
  handleData: Function,
  previousStep: Function,
  isLoading: Boolean,
  domain: String,
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
            Add the following records for your DNS provider's records
          </div>
          <div class="font-medium text-lg">{{ domain }}</div>
          <div>
            <div class="font-normal text-lg">SPF & DKIM</div>
            <p class="p-0 m-0 text-gray-600">
              The Owner, SPF & DKIM are TXT records help prevent spoofing and
              can help prevent your emails being marked as spam by inboxes
            </p>
          </div>
          <div>
            <div class="font-normal text-lg">CNAME</div>
            <p class="p-0 m-0 text-gray-600">
              Unless you already have MX records for this domain pointing to
              another email provider, you should update the following records
            </p>
          </div>
          <div>
            <div class="font-normal text-lg">MX</div>
            <p class="p-0 m-0 text-gray-600">
              This CNAME record tracks clicks, opens, and unsubscribes
            </p>
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
        :on-click="() => handleData && handleData({}, 5)"
        ><template v-slot:right-icon>
          <RightArrowIcon />
        </template>
      </Button>
    </div>
  </div>
</template>
