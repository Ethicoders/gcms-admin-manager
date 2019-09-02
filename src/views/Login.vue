<template>
  <div class="login q-pa-md row justify-center">
    <q-layout
      view="hHh lpR fFf"
      container
      style="height: 400px; max-width: 900px;"
      class="q-pa-md shadow-2 rounded-borders"
    >
      <q-header>
      </q-header>
      <q-page-container>
        <q-page padding>
          <div class="text-h4 q-mb-md">Connect</div>
          <q-form>
            <q-input v-model="consumer.login" label="Login" />
            <q-input v-model="consumer.password" label="Password" type="password" />

            <q-btn :label="$t('app.submit')" type="submit" color="primary" />
          </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Configurator from '@/components/Configurator.vue';
import Projects from '@/components/Projects.vue';
import { Project } from '@/interfaces/project';

import { ipcRenderer } from 'electron';

@Component({
  components: {
    Configurator,
    Projects,
  },
})
export default class Login extends Vue {
  private consumer: any = {};
  private selectedTab: any = 'connect';
  private projects: Project[] = [];
  private selectedProject: any = '';

  private handleOnCreate(project: Project) {
    this.createProjectSettings(project);
    this.projects = [...this.projects, project];
  }

  private createProjectSettings(project: Project) {
    ipcRenderer.send('onCreateProject', project);
  }
}
</script>

<style lang="scss">
</style>