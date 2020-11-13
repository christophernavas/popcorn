<template>
  <q-page class="flex column items-center justify-center" padding>
    <!-- content -->
    <q-form v-if="loaded" @submit="onSubmit">
      <div class="text-left">
        <q-card v-for="(question, index) in questions" :key="index" flat bordered class="custom-card">
          <q-card-section>
            <div class="card-title">{{ question.theme }}</div>
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

    <!-- Skeleton when data is not loaded completely -->
    <div v-else>
      <q-card flat class="custom-card" style="min-height:360px;">
        <q-skeleton height="50px" square />
        <!-- <q-skeleton type="text" class="text-subtitle1" /> -->
        <q-card-section>
          <q-skeleton type="text" class="text-subtitle1" />
        </q-card-section>
        <q-card-section>
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
        </q-card-section>
      </q-card>
      <q-card flat class="custom-card" style="min-height:360px;">
        <q-skeleton height="50px" square />
        <!-- <q-skeleton type="text" class="text-subtitle1" /> -->
        <q-card-section>
          <q-skeleton type="text" class="text-subtitle1" />
        </q-card-section>
        <q-card-section>
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
        </q-card-section>
      </q-card>
      <q-card flat class="custom-card" style="min-height:360px;">
        <q-skeleton height="50px" square />
        <!-- <q-skeleton type="text" class="text-subtitle1" /> -->
        <q-card-section>
          <q-skeleton type="text" class="text-subtitle1" />
        </q-card-section>
        <q-card-section>
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    shuffle (array) {
      let currentIndex = array.length, temporaryValue, randomIndex
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
    getQuestions (array, url, theme) {
      axios
        .get(url)
        .then(response => {
          const questions = response.data.questions
          let questionTheme = ''
          questions.forEach(question => {
            const options = []
            if (question.theme) {
              questionTheme = question.theme
            } else if (theme) {
              questionTheme = theme
            } else {
              questionTheme = 'La Casa de Papel'
            }
            question.answers.forEach(answer => {
              options.push({
                label: answer.answer,
                value: answer.answer
              })
            })
            question.theme = questionTheme
            question.options = options
            question.model = null
            this.shuffle(question.options)
            array.push(question)
          })
          this.shuffle(array)
        })
        .catch(error => console.log(error))
      return array
    },
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
      questions: [],
      loaded: false
    }
  },
  created () {
    this.getQuestions(this.questions, 'https://wsf-popcorn-backend.herokuapp.com/api/questions')
    this.getQuestions(this.questions, 'https://polar-ocean-73785.herokuapp.com/api/questions/random', 'Polar Ocean')
    this.getQuestions(this.questions, 'https://stagingquizzpursuit.herokuapp.com/api/questions/random', 'Quizz Pursuit')
    this.getQuestions(this.questions, 'https://adley-quizz.herokuapp.com/api/questions/random', 'Adley Quizz')
  },
  watch: {
    questions (value) {
      this.loaded = true
    }
  }
}
</script>
