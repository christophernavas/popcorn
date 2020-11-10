<template>
  <q-page class="flex column items-center justify-center" padding>
    <!-- content -->
    <q-form @submit="onSubmit" @reset="onReset">
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
            <div class="card-body">
              <q-option-group :options="question.options" type="radio" v-model="question.model" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="text-center">
        <q-btn type="submit" color="secondary" label="Envoyer" size="20px" style="width: 250px;"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    onSubmit (e) {
      console.log(e)
      const score = this.calculateScore()
      this.$store.dispatch('updateScore', score)
        .then(() => this.$router.push('/leaderboard'))
        .catch(err => console.log(err))
    },
    onReset () {
      console.log('reset')
    },
    calculateScore () {
      console.log('score')
      let score = 0
      score = 10
      return score
    }
  },
  data () {
    return {
      questions: null
    }
  },
  mounted () {
    axios
      .get('https://wsf-popcorn-backend.herokuapp.com/api/questions')
      .then(response => {
        const questions = response.data.questions
        questions.forEach(question => {
          const options = []
          question.answers.forEach(answer => {
            options.push({
              label: answer.answer,
              value: answer.answer
            })
          })
          question.options = options
          question.model = null
        })
        console.log(questions)
        this.questions = questions
      })
      .catch(error => console.log(error))
  }
}
</script>
