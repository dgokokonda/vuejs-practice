<template>
  <div>
   <input placeholder="Email" type="email" v-model="form.email"/>
   <input placeholder="Name" v-model="form.name"/>
   <button @click="onSave">Save</button>
   <button @click="onCancel">Save</button>
  </div>
</template>

<script>

export default {
  props: {
    user: {
     type: Object,
     default: () => ({})
    }
  },
  data() {
   return {
    form: {}
   }
  },
  methods: {
   onSave() {
    this.$emit('submit', this.form)
   },
   onCancel() {
    this.form = {...this.user}
    this.$emit('cancel')
   }
  },
  watch: {
    user: {
        immediate: true,
        handler: function(userFromProps){      
        if(userFromProps){
            this.form = {
            ...this.form,
            ...userFromProps
            }
        }
     }
    }
  }
 }
 
</script>