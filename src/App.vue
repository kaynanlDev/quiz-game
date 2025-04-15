<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

let question = ref(null)
let incorrectAnswer = ref([]) 
let correctAnswer = ref(null)
let allAnswers = ref([])

   function prepareAnswer(){
      let answers = [...incorrectAnswer.value]
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correctAnswer.value)
      allAnswers.value = answers 
      console.log(correctAnswer.value)
    }
    onMounted(() =>{
       axios.get('https://opentdb.com/api.php?amount=1')
      .then((response) => {
        question.value = response.data.results[0].question
        incorrectAnswer.value = response.data.results[0].incorrect_answers
        correctAnswer.value = response.data.results[0].correct_answer

        prepareAnswer()
      })
    }, 
)
</script>

<template>
 <div>
  <h1 v-html="question"></h1>
  <input type="radio" name="options">
  <label>true</label><br>

  <input type="radio" name="options">
  <label>false</label><br>

  <button class="send">send</button>
 </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

}

h1 {
  margin-top: 40px;
}

input[type='radio']{
  margin: 12px 4px;
}

button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}

section.score {
  border-bottom: 1px solid black;
  padding: 24px;
  font-size: 18px; 
}

span {
    padding: 8px;
    font-weight: bold;
    border: 1px solid black;
  }
</style>
