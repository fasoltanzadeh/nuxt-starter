<style lang="scss" scoped>
.container {
  padding: 0;
  @include media(md) {
    padding: 12px;
  }
}
.splash {
  background: #00cbb3;
}
</style>
<template>
  <v-app>
      <v-content>
        <nuxt />
      </v-content>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
@Component({
  // middleware: 'auth',
})
export default class DefaultLayout extends Vue {}
</script>
