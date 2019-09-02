<template>
  <div class="projects">
    <q-table :data="list" :columns="columns" row-key="name" selection="multiple">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-toggle dense v-model="props.selected" />
          </q-td>
          <q-td key="name" :props="props">{{ props.row.domainName }}</q-td>
          <!-- <q-td key="port" :props="props">{{ props.row.port }}</q-td> -->
          <q-td key="actions" :props="props">
            <q-btn-group>
              <q-btn color="accent" icon="timeline" />
              <q-btn color="accent" icon="visibility" />
              <q-btn color="accent" icon="update" />
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ProjectDetails from './ProjectDetails.vue';
import { Project } from '@/interfaces/project';

@Component({
  components: {
    ProjectDetails,
  },
})
export default class Projects extends Vue {
  @Prop()
  private list?: Project[];

  private columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      sortable: true,
    },
    {
      name: 'port',
      required: true,
      label: 'Port',
      align: 'left',
      sortable: true,
    },
  ];
}
</script>

<style lang="stylus"></style>