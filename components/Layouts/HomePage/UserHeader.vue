<style lang="scss" scoped>
.main-header{
    position: relative;
    z-index: 98;
    color: #212121;
    width: 100%;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1) all;
    padding: 6vh 54px 3vh;
     
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
            &.nuxt-link-active {
                color: #212121;
                font-size: 14px !important;
                font-weight: bold;
            }
        }
    }
}
</style>
<template>
    <header 
        class="main-header"
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
    </header>
</template>