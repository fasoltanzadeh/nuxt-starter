<style lang="scss" scoped>
    .auth-box{
        width: 446px;
        margin: auto;
        padding: 32px;
        .confirm-btn{
            width: 100%;
            height: 48px;
            font-size: 14;
            font-weight: bold;
            background-color: #005AAA !important;
            color: #ffffff;
            border-radius: 2px;
            text-transform: none;
        }
        .desc{
            font-size: 12px;
            margin-bottom: 110px;
            span{
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
</style>
<template>
    <v-card class="auth-box">
        <v-card-title class="pa-0">Welcome to Jobbitta</v-card-title>
        <div class="desc">
            Set a passwrod for your account.
        </div>
        <form @submit.prevent="onSetPassword">
            <v-text-field 
                placeholder="Password"
                name="password"
                type="password"
                v-model="form.password"
            />
            <v-text-field 
                placeholder="Retype Password"
                name="retype-password"
                type="password"
                v-model="form.retypePassword"
            />
            <v-btn  @click="onSetPassword" class="confirm-btn mb-4">Confirm</v-btn>
        </form>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class SetPasswordForm extends Vue {
    @Prop({
        type: Object,
        required: true,
    })
    readonly value!: object
    get form() {
        return this.value
    }
    set form(val) {
        this.$emit('input', val)
    }

    onSetPassword(){
        this.$emit('setPassword', this.form)
    }
}
</script>