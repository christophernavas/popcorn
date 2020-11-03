<template>
  <q-page class="flex column items-center justify-center">
    <!-- content -->
    <div class="text-center">
      <h1>Leaderboard</h1>
      <q-select
        label="Afficher"
        v-model="model"
        :options="options"
        @input="(val) => { onValueChange(val); }"
        class="q-pb-xl"
      />
      <q-table
        :data="data.popcorn"
        :columns="columns"
        row-key="name"
        v-if="showPopcorn"
        hide-bottom
        virtual-scroll
        :pagination.sync="pagination"
      />
      <q-table
        :data="data.moviz"
        :columns="columns"
        row-key="name"
        v-if="showMoviz"
        hide-bottom
        virtual-scroll
        :pagination.sync="pagination"
      />
      <q-table
        :data="data.wsfquiz"
        :columns="columns"
        row-key="name"
        v-if="showWSFquiz"
        hide-bottom
        virtual-scroll
        :pagination.sync="pagination"
      />
      <q-table
        :data="data.cinequiz"
        :columns="columns"
        row-key="name"
        v-if="showCinequiz"
        hide-bottom
        virtual-scroll
        :pagination.sync="pagination"
      />
      <div class="q-pt-xl">
      <q-btn
        to="/"
        color="secondary"
        label="Rejouer"
        size="20px"
        style="width: 250px"
      />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    onValueChange (val) {
      switch (val) {
        case 'Popcorn':
          this.showPopcorn = true
          this.showMoviz = false
          this.showWSFquiz = false
          this.showCinequiz = false
          break
        case 'Moviz':
          this.showPopcorn = false
          this.showMoviz = true
          this.showWSFquiz = false
          this.showCinequiz = false
          break
        case 'WSFquiz':
          this.showPopcorn = false
          this.showMoviz = false
          this.showWSFquiz = true
          this.showCinequiz = false
          break
        case 'Cinéquiz':
          this.showPopcorn = false
          this.showMoviz = false
          this.showWSFquiz = false
          this.showCinequiz = true
          break
      }
    }
  },
  data () {
    return {
      model: null,
      showPopcorn: true,
      showMoviz: false,
      showWSFquiz: false,
      showCinequiz: false,
      pagination: {
        rowsPerPage: 0
      },
      options: ['Popcorn', 'Moviz', 'WSFquiz', 'Cinéquiz'],
      columns: [
        {
          name: 'ranking',
          align: 'left',
          label: 'RANKING #',
          field: 'ranking',
          sortable: true
        },
        { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
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
        popcorn: [
          {
            ranking: 1,
            id: 'Devon Lane',
            score: '100'
          },
          {
            ranking: 2,
            id: 'Cody Fisher',
            score: '90'
          },
          {
            ranking: 3,
            id: 'Jacob Jones',
            score: '80'
          },
          {
            ranking: 4,
            id: 'Robert Fox',
            score: '75'
          },
          {
            ranking: 5,
            id: 'Eleanor Pena',
            score: '70'
          },
          {
            ranking: 6,
            id: 'Kathryn Murphy',
            score: '50'
          },
          {
            ranking: 687,
            id: 'John Doe',
            score: '10'
          }
        ],
        moviz: [
          {
            ranking: 1,
            id: 'Cody Fisher',
            score: '100'
          },
          {
            ranking: 2,
            id: 'Devon Lane',
            score: '90'
          },
          {
            ranking: 3,
            id: 'Kathryn Murphy',
            score: '85'
          },
          {
            ranking: 4,
            id: 'Jacob Jones',
            score: '80'
          },
          {
            ranking: 5,
            id: 'Robert Fox',
            score: '75'
          },
          {
            ranking: 6,
            id: 'Eleanor Pena',
            score: '70'
          },
          {
            ranking: 450,
            id: 'John Doe',
            score: '20'
          }
        ],
        wsfquiz: [
          {
            ranking: 1,
            id: 'Devon Lane',
            score: '100'
          },
          {
            ranking: 2,
            id: 'Cody Fisher',
            score: '90'
          },
          {
            ranking: 3,
            id: 'Jacob Jones',
            score: '80'
          },
          {
            ranking: 4,
            id: 'Robert Fox',
            score: '75'
          },
          {
            ranking: 5,
            id: 'Eleanor Pena',
            score: '70'
          },
          {
            ranking: 6,
            id: 'Kathryn Murphy',
            score: '60'
          },
          {
            ranking: 80,
            id: 'John Doe',
            score: '40'
          }
        ],
        cinequiz: [
          {
            ranking: 1,
            id: 'Devon Lane',
            score: '100'
          },
          {
            ranking: 2,
            id: 'Cody Fisher',
            score: '90'
          },
          {
            ranking: 3,
            id: 'Jacob Jones',
            score: '85'
          },
          {
            ranking: 4,
            id: 'Robert Fox',
            score: '80'
          },
          {
            ranking: 5,
            id: 'Eleanor Pena',
            score: '70'
          },
          {
            ranking: 6,
            id: 'Kathryn Murphy',
            score: '65'
          },
          {
            ranking: 125,
            id: 'John Doe',
            score: '30'
          }
        ]
      }
    }
  }
}
</script>
