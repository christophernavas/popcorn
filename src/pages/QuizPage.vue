<template>
  <q-page class="flex column items-center justify-center" padding>
    <!-- content -->
    <div class="text-left">
      <q-card v-for="(question, index) in questions" :key="index" flat bordered class="custom-card">
        <q-card-section>
          <div class="card-title">La Casa de Papel</div>
        </q-card-section>

        <q-separator color="secondary" inset />

        <q-card-section class="q-pt-lg card-question">
          {{question.question}}
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item v-for="(answer, index) in question.answers" :key="index"  tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="userResponse" :val="answer.answer"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{answer.answer}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-btn to="/leaderboard" color="secondary" label="Envoyer" size="20px" />
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      questions: null,
      userResponse: null,
      group: null,
      options: [{
        label: 'Pedro Alonso',
        value: 'Pedro Alonso'
      },
      {
        label: 'Enrique Arce',
        value: 'Enrique Arce'
      },
      {
        label: 'Alvaro Morte',
        value: 'Alvaro Morte'
      },
      {
        label: 'Miguel Herran',
        value: 'Miguel Herran'
      }
      ]
    }
  },
  mounted () {
    axios
      .get('https://wsf-popcorn-backend.herokuapp.com/api/questions')
      .then(response => (this.questions = response.data.questions))
      .catch(error => console.log(error))
  }
}
</script>
