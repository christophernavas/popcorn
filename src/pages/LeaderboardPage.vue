<template>
  <q-page class="flex column justify-center">
    <!-- content -->
    <div class="text-center">
      <h1>Leaderboard</h1>
      <div class="items-baseline flex justify-center">
        <div class="text-h5 text-white text-bold white q-pr-lg">
          Afficher :
        </div>
        <div class="">
          <q-select  v-model="theme" bg-color="white" outlined :options="options" @input="(val) => { onValueChange(val); }"
            class="custom-select q-pb-xl" />
        </div>
      </div>
      <div style="max-width: 600px;margin: auto;">
        <q-table :data="data.popcorn" :columns="columns" row-key="name" v-if="showPopcorn" hide-bottom virtual-scroll
          :pagination.sync="pagination" />
        <q-table :data="data.polarocean" :columns="columns" row-key="name" v-if="showPolarOcean" hide-bottom virtual-scroll
          :pagination.sync="pagination" />
        <q-table :data="data.quizzpursuit" :columns="columns" row-key="name" v-if="showQuizzPursuit" hide-bottom virtual-scroll
          :pagination.sync="pagination" />
        <q-table :data="data.adleyquizz" :columns="columns" row-key="name" v-if="showAdleyQuizz" hide-bottom virtual-scroll
          :pagination.sync="pagination" />
        </div>
      <div class="q-pt-xl">
        <q-btn to="/" color="secondary" label="Rejouer" size="20px" style="width: 250px" />
      </div>
    </div>
  </q-page>
</template>

<script>
const axios = require('axios')

export default {
  methods: {
    onValueChange (val) {
      switch (val) {
        case 'Popcorn':
          this.showPopcorn = true
          this.showAdleyQuizz = false
          this.showQuizzPursuit = false
          this.showPolarOcean = false
          break
        case 'Polar Ocean':
          this.showPopcorn = false
          this.showAdleyQuizz = false
          this.showQuizzPursuit = false
          this.showPolarOcean = true
          break
        case 'Quizz Pursuit':
          this.showPopcorn = false
          this.showAdleyQuizz = false
          this.showQuizzPursuit = true
          this.showPolarOcean = false
          break
        case 'Adley Quizz':
          this.showPopcorn = false
          this.showAdleyQuizz = true
          this.showQuizzPursuit = false
          this.showPolarOcean = false
          break
      }
    },
    getQuizLeaderboard (table, endpoint, limit) {
      const user = this.$store.state.user
      let popcorn = false
      let userData = null
      let url = null
      if (limit && limit > 0) {
        url = endpoint + '/' + limit
      } else {
        popcorn = true
        url = endpoint
      }
      axios
        .get(url)
        .then(response => {
          let scores = {}
          let ranking = 0
          if (response.data.scores) {
            scores = response.data.scores
          } else {
            scores = response.data.data
          }
          scores.forEach(score => {
            // si user n'est pas dans le top :limit, on l'affiche en dessous du top :limit, donc à la suite du tableau
            // sinon, on affiche user dans le top :limit
            ranking += 1
            if (popcorn && user.username != null && user.score != null && user.username === score.username && user.score === score.score && ranking > 10) {
              userData = {
                ranking: ranking,
                username: user.username,
                score: user.score
              }
            } else {
              table.push({
                ranking: ranking,
                username: score.username,
                score: score.score
              })
            }
          })
          if (popcorn) {
            this.data.popcorn = table.slice(0, 10)
            this.$store.dispatch('resetState')
          }
          if (userData) {
            this.data.popcorn.push(userData)
          }
        })
        .catch(error => console.log(error))
    }
  },
  data () {
    return {
      theme: 'Popcorn',
      showPopcorn: true,
      showPolarOcean: false,
      showQuizzPursuit: false,
      showAdleyQuizz: false,
      pagination: {
        rowsPerPage: 0
      },
      options: ['Popcorn', 'Polar Ocean', 'Quizz Pursuit', 'Adley Quizz'],
      columns: [{
        name: 'ranking',
        align: 'left',
        label: 'RANG #',
        field: 'ranking',
        sortable: true
      },
      {
        name: 'username',
        align: 'left',
        label: 'PSEUDO',
        field: 'username',
        sortable: true
      },
      {
        name: 'score',
        align: 'left',
        label: 'SCORE (%)',
        field: 'score',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      }
      ],
      data: {
        userId: null,
        popcorn: [],
        polarocean: [],
        quizzpursuit: [],
        adleyquizz: []
      }
    }
  },
  async created () {
    const limit = 10
    const user = this.$store.state.user
    if (user.username != null && user.score != null) {
      const body = {
        username: user.username,
        score: user.score
      }
      const response = await axios.post('https://wsf-popcorn-backend.herokuapp.com/api/scores/new', body)
      this.data.userId = response.data._id
    }
    this.getQuizLeaderboard(this.data.popcorn, 'https://wsf-popcorn-backend.herokuapp.com/api/scores')
    this.getQuizLeaderboard(this.data.polarocean, 'https://polar-ocean-73785.herokuapp.com/api/scores', limit)
    this.getQuizLeaderboard(this.data.quizzpursuit, 'https://stagingquizzpursuit.herokuapp.com/api/scores', limit)
    this.getQuizLeaderboard(this.data.adleyquizz, 'https://adley-quizz.herokuapp.com/api/scores', limit)
  }
}
</script>
