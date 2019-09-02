<template>
  <div class="configurator">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="project.domainName"
        :label="$t('configurator.domainName.label')"
        hint="$t('configurator.domainName.hint')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        v-model="project.customArgs"
        :label="$t('configurator.customArgs.label')"
      />

      <div>
        <q-btn :label="$t('app.submit')" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Project } from '@/interfaces/project';

const initialValue = {
  domainName: '',
  customArgs: '',
};

@Component
export default class Configurator extends Vue {
  private project: Project = { ...initialValue };

  @Emit('create')
  private onSubmit() {
    // this.$q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'fas fa-check-circle',
    //   message: 'Submitted',
    // });
    console.log(this.project);

    return { ...this.project };
  }

  private onReset() {
    this.project = { ...initialValue };
  }
}
</script>

<style lang="scss">
</style>