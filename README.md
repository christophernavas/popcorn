# Popcorn

Popcorn is a quiz application for movies and series.

Popcorn, first asks the user to enter a nickname before directing them to a list of multiple-choice questions. One or more bonus questions from other quizzes may be present in the list of questions.
Once these questions are answered, the user accesses a leaderboard with his score and that of other previous participants. He can filter the scores by quiz.

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

# Current version - popcorn-v1.0.0
## New
- feature/home-page-integration: home page integration
- feature/quiz-page-integration: integration of the quiz page
- feature/leaderboard-page-integration: integration of the leaderboard page in static
- feature/vuex-state: setting up a report to save user data between pages
- feature/dynamic-leaderboard: dynamic leaderboard page and link with external APIs
- feature/api-call: api call on front for routes scores and questions
- feature/quiz-score: calculation of the user's score as a percentage of correct answers
- feature/quiz-random-question: mixing questions and retrieving a random question from each external API :
- feature/leaderboard-user-score: persistence of basic user data (nickname and score obtained) and display of the leaderboard according to the user's ranking
- feature/skeleton: Display of a card preview, the time to load pages data
- feature/highlighting-user: Highlighting of the score (current user) in the leaderboard

## Fixes
- Resolution of various front-end bugs related to user data management and improvement of the application logic.
