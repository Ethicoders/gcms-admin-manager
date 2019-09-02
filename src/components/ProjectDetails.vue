<template>
  <div class="project">
    {{ data }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Project } from '@/interfaces/project';

@Component
export default class ProjectDetails extends Vue {
  @Prop()
  private data?: Project;
}
</script>

<style lang="scss">
</style>