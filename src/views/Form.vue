<template>
    <div>
      <span> Email {{user.email}}</span>
      <span> Name {{user.name}}</span>
      <SomeForm :user="user" @submit="saveUserData" />
    </div>
</template>
<script>
import SomeForm from '../components/SomeForm'

export default {
    name: 'UserForm',
    data() {
        return {
            user: {
                email: 'loreipsum@email.com',
                name: 'Lorem Ipsum'
            },
        }
    },
    methods: {
        saveUserData(data) {
            // if success
            this.user = data;
        },
    },
    components: {
        SomeForm
    }
}
</script>