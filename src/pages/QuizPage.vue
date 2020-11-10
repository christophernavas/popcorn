<template>
  <q-page class="flex column items-center justify-center" padding>
    <!-- content -->
    <q-form @submit="onSubmit">
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
    calculateScore () {
      let nbCorrect = 0
      let nbQuestions = 0
      this.questions.forEach(question => {
        question.answers.forEach(answer => {
          if (question.model === answer.answer) {
            if (answer.isCorrect) {
              nbCorrect += 1
            }
          }
        })
        nbQuestions += 1
      })
      return (Math.round(nbCorrect / nbQuestions * 100))
    },
    onSubmit () {
      const score = this.calculateScore()
      this.$store.dispatch('updateScore', score)
        .then(() => this.$router.push('/leaderboard'))
        .catch(err => console.log(err))
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
        this.questions = questions
      })
      .catch(error => console.log(error))
  }
}
</script>
