<template>
  <div class="text-control" :data-moduleName='moduleName' v-context-menu='menuOptions'>
    <b-field :label="label">
      <b-input
        type="text"
        v-model="valueIn"
      ></b-input>
    </b-field>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { Menu, MenuItem } from 'nwjs-menu-browser';

  if (!window.nw) {
    window.nw = {
      Menu,
      MenuItem,
    };
  }

  const nw = window.nw;

  export default {
    name: 'textControl',
    props: [
      'module',
      'control',
    ],
    data() {
      return {
        menuOptions: {
          match: ['textControl'],
          menuItems: [],
        },
        valueIn: undefined,
      };
    },
    computed: {
      moduleName() {
        return this.module.info.name;
      },
      label() {
        return this.control.label;
      },
      variable() {
        return this.control.variable;
      },
      defaultValue() {
        return this.control.default;
      },
    },
    methods: {
      ...mapMutations('modVModules', [
        'setActiveModuleControlValue',
      ]),
    },
    beforeMount() {
      this.$data.menuOptions.menuItems.push(
        new nw.MenuItem({
          label: this.label,
          enabled: false,
        }),
        new nw.MenuItem({
          type: 'separator',
        }),
      );

      this.valueIn = this.defaultValue;
    },
    watch: {
      valueIn() {
        const value = this.valueIn;

        this.setActiveModuleControlValue({
          moduleName: this.moduleName,
          variable: this.variable,
          value,
        });
      },
    },
  };
</script>
