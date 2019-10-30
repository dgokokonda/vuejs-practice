<template>
    <div class="layout" @click="$emit('toggle-display', false)"></div>
</template>
<script>
    export default {
        name: 'Layout',
    }
</script>