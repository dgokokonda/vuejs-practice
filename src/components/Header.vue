<template lang="html">
    <div class="header">
        <ul>
            <li>
                <router-link to="/" exact>Home</router-link>
            </li>
            <li>
                <router-link to="/menu">Menu</router-link>
            </li>
            <li>
                <router-link to="/form">Form</router-link>
            </li>
            <li>
                <router-link to="/user/foo">User</router-link>
                <router-link to="/user/foo/profile">User</router-link>
            </li>
            <li>
                <router-link to="/doc">Document form</router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="sass">
    .header li
        display: inline-block
        margin: 0 15px
</style>
