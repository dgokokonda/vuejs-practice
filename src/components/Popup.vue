<template>
    <div class="popup">
        <h2 class="popup__title">Test popup</h2>
        <div class="popup__close" @click="$emit('toggle-display', !visible)"></div>
        <p>This form has sent</p>
        <div><button class="popup__btn btn" @click="$emit('toggle-display', !visible)">Close</button></div>
    </div>
</template>

<script>
    export default {
        name: 'Popup',
        props: ['visible', 'toggle-display']
    }
</script>

<style scoped lang="sass">
    @import '../assets/sass/popup.sass'
</style>