<template>
  <q-page class="flex items-center">
    <div class="text-center">
      <h1>
        Bienvenue sur Popcorn, LE quiz dédié aux films et séries par excellence !
      </h1>
      <h2>
        Entrez votre pseudo pour commencer
      </h2>
        <q-form class="q-pt-md" style="max-width: 250px; margin:auto" @submit="onSubmit" @reset="onReset">
          <q-input class="q-mb-xl" outlined  bg-color="white" label="Pseudo" v-model="username" input-class="text-center" :rules="[val => !!val]"/>
          <q-btn type="submit" color="secondary" label="Jouer" size="20px"  class="full-width" />
        </q-form>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    onSubmit: function () {
      const username = this.username
      this.$store.dispatch('createUser', username)
        .then(() => this.$router.push('/quiz'))
        .catch(err => console.log(err))
    },
    onReset: function () {
    }
  },
  data () {
    return {
      username: ''
    }
  }
}
</script>
