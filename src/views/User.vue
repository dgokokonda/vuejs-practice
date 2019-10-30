<template>
    <div class="user">
        <h1>User {{$route.params.id}}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'User'
}
</script>