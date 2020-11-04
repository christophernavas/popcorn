<template>
  <q-page class="flex column items-center justify-center" padding>
    <!-- content -->
    <p>salut bg, voilà les questions :</p>
    <p>{{questions}}</p>
    <p>salut bg, voilà les scores des users :</p>
    <p>{{usersScores}}</p>
    <div class="text-left">
      <q-card flat bordered class="custom-card">
        <q-card-section>
          <div class="card-title">La Casa de Papel</div>
        </q-card-section>

        <q-separator color="secondary" inset />

        <q-card-section class="q-pt-lg card-question">
          Comment s'appelle el profesor dans la réalité ?
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>
    </div>
    <q-btn  to="/" color="secondary" label="Envoyer" size="20px" />
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      questions: null,
      usersScores: null,
      group: null,
      options: [
        { label: 'Pedro Alonso', value: 'Pedro Alonso' },
        { label: 'Enrique Arce', value: 'Enrique Arce' },
        { label: 'Alvaro Morte', value: 'Alvaro Morte' },
        { label: 'Miguel Herran', value: 'Miguel Herran' }
      ]
    }
  },
  mounted () {
    axios
      .get('https://wsf-popcorn-backend.herokuapp.com/api/questions')
      .then(response => (this.questions = response.data))

    axios
      .get('https://wsf-popcorn-backend.herokuapp.com/api/scores')
      .then(response => (this.usersScores = response.data))
  }
}
</script>
