<style lang="scss" scoped>
.main-header{
    position: relative;
    z-index: 98;
    background-color: #002242;
    color: #ffffff;
    width: 100vw;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1) all;
    padding: 48px 54px 0;
    display: flex;
    flex-direction: column;
    &.sticky {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        background-color: #fff;
        position: fixed;
        top: 0;
        // &.main-header {
        //     line-height: 70px;
        //     height: 70px;
        // }
    } 
    .logo {
        font-size: 16px;
        font-weight: bold;
        margin-right: 64px;
    }
    .container {
        padding: 0;
    }
    ul{
        padding: 0 32px 0 0;
    }
    li {
        list-style: none;
        a {
            &.nuxt-link-exact-active {
                color: #ffffff;
                font-size: 14px;
            }
            &.nuxt-link-active {
                color: #ffffff;
                font-size: 14px;
            }
        }
    }
}
</style>
<template>
    <header 
        class="main-header"
        :class="{
            sticky: scrolled,
        }"
    >
        <v-container class="d-flex justify-space-between">
            <div class="d-flex">
                <div class="logo">
                    Jobitta
                </div>
                <nav class="d-flex"> 
                            <!-- <nuxt-link></nuxt-link> -->
                    <ul>
                        <li>
                            <nuxt-link to="/">
                                FAQ
                            </nuxt-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <nuxt-link to="/">
                                Support
                            </nuxt-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <nuxt-link to="/">
                                About us
                            </nuxt-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <nav class="d-flex">
                <ul>
                    <li>
                        <v-icon color="#ffffff">la-bell</v-icon>
                    </li>
                </ul>
                <ul>
                    <li>
                        <nuxt-link to="/">
                            <v-icon color="#ffffff">la-user-circle</v-icon>
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </v-container>
        <slot name="subtitle"></slot>
    </header>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'nuxt-property-decorator'
@Component
export default class HeaderDesktopComponent extends Vue {
  get mainMenu() {
    return this.$store.state.navigation.items
  }

  limitPosition = 500
  scrolled = false
  lastPosition = 0

  handleScroll() {
    if (
      this.lastPosition < window.scrollY &&
      this.limitPosition < window.scrollY
    ) {
      // move up!
      this.scrolled = true
    }

    if (this.lastPosition > window.scrollY) {
      // move down
      this.scrolled = false
    }

    this.lastPosition = window.scrollY
    this.scrolled = window.scrollY > 250
  }

  mounted() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
}
</script>
