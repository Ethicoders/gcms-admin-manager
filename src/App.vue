<template>
  <div id="app">
    <div class="row justify-center">
      <q-layout view="hHh lpR fFf">
        <q-header>
          <q-bar class="q-electron-drag">
            <div class="cursor-pointer non-selectable">
              File
              <q-menu>
                <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Cut</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Copy</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Paste</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Select All</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <!-- Session manager... -->
            <!-- New session -->
            <div class="cursor-pointer non-selectable">
              Edit
              <q-menu>
                <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Cut</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Copy</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Paste</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Select All</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <q-space />
            <q-btn dense flat icon="minimize" @click="minimize" />
            <q-btn dense flat icon="crop_square" @click="maximize" />
            <q-btn dense flat icon="close" @click="close" />
          </q-bar>

          <q-tabs v-model="selectedSession" shrink align="left" dense>
            <draggable v-model="sessions">
              <transition-group>
                <q-tab
                  class="session-tab"
                  v-for="(session, index) in sessions"
                  :key="index"
                  :name="session.name"
                  @click="switchSession(session.name)"
                >
                  <div style="display: flex; align-items: center;">
                    <span
                      class="ellipsis"
                      style="max-width: 50px; "
                    >{{ session.label }} {{session.name}}</span>
                    <q-btn
                      v-if="sessions.length !== 1"
                      style="pointer-events: auto;"
                      @click.stop="closeSession(index)"
                      dense
                      flat
                      size="sm"
                      icon="close"
                    />
                  </div>
                </q-tab>
              </transition-group>
            </draggable>
            <q-btn icon="add" flat class="session-tab-add" @click="addSession($event)" />
          </q-tabs>
        </q-header>

        <q-page-container>
          <!-- Virtual page container -->
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ipcRenderer, remote } from 'electron';
import { uid } from 'quasar';
import draggable from 'vuedraggable';

@Component({
  components: { draggable },
})
export default class App extends Vue {
  private myArray = [
    { id: 'prout', name: 'Prout' },
    { id: 'bla', name: 'Bla' },
  ];

  private value = 0;
  private sessions: { name; label }[] = [
    {
      name: 'session-1',
      label: 'Session 1',
    },
  ];
  private selectedSession = this.sessions[0].name;

  private close() {
    if (process.env.IS_ELECTRON) {
      (remote as any).BrowserWindow.getFocusedWindow().close();
    }
  }

  private minimize() {
    if (process.env.IS_ELECTRON) {
      remote.BrowserWindow.getFocusedWindow().minimize();
    }
  }

  private maximize() {
    if (process.env.IS_ELECTRON) {
      const win = remote.BrowserWindow.getFocusedWindow();

      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  }

  private addSession() {
    const newName = uid();
    this.sessions = [
      ...this.sessions,
      {
        name: newName,
        label: 'New',
      },
    ];
    this.selectedSession = newName;
    ipcRenderer.send('createSession', newName);
  }

  private closeSession(sessionIndex: number) {
    const sessionName = this.sessions[sessionIndex].name;
    if (this.selectedSession === this.sessions[sessionIndex].name) {
      this.selectedSession = this.sessions[
        0 === sessionIndex ? sessionIndex + 1 : sessionIndex - 1
      ].name;
    }
    this.sessions.splice(sessionIndex, 1);
    ipcRenderer.send('closeSession', sessionName);
    this.switchSession(this.selectedSession);
  }

  private switchSession(newSession: string) {
    ipcRenderer.send('switchSession', newSession);
  }
}
</script>

<style lang="stylus" scoped>
.session-tab {
  max-width: 100px;
  display: inline;
}

.session-tab-add {
  max-width: 40px;
}
</style>
