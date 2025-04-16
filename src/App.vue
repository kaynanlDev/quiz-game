<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

let question = ref(null)
let incorrectAnswer = ref([]) 
let correctAnswer = ref(null)
let allAnswers = ref([])
let chosenAnswer = ref(null)
let showResult = ref(false)
let btnSend = ref(true)
let inputDisabled = ref(false)

   function prepareAnswer(){
      let answers = [...incorrectAnswer.value]
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correctAnswer.value)
      allAnswers.value = answers 
      console.log(correctAnswer.value)
    }

    function submitAnswer() {
      if(!chosenAnswer.value){
        console.log("erro")
      } else{
        if(chosenAnswer.value == correctAnswer.value){
          console.log('você acertou')
        } else{
          console.log('você errou')
        }
      }
      showResult.value = true
      btnSend.value = false
      inputDisabled.value = true
    }

    function getRequest(){
      axios.get('https://opentdb.com/api.php?amount=1')
      .then((response) => {
        question.value = response.data.results[0].question
        incorrectAnswer.value = response.data.results[0].incorrect_answers
        correctAnswer.value = response.data.results[0].correct_answer

        prepareAnswer()
      })
    } 
    function getNewRequest(){
      axios.get('https://opentdb.com/api.php?amount=1')
      .then((response) => {
        question.value = response.data.results[0].question
        incorrectAnswer.value = response.data.results[0].incorrect_answers
        correctAnswer.value = response.data.results[0].correct_answer

        prepareAnswer()

        showResult.value = false
        btnSend.value = true
        chosenAnswer.value = null
      })
    }
    onMounted(() =>{
      getRequest()
    }
)
</script>

<template>
 <div>
  <h1 v-html="question"></h1>

  <template v-for="(answer, index) in allAnswers" :key="index">
    <input type="radio" name="options" :value="answer" v-model="chosenAnswer" :disabled="chosenAnswer">
    <label>{{answer}}</label><br>
  </template>


  <button v-if="btnSend" class="send" @click="submitAnswer()">send</button>

  <section v-show="showResult">
    <h4 v-if="chosenAnswer == correctAnswer">✅ congratulations! the correct answer is "{{ correctAnswer }}""</h4>
    <h4 v-else>❌ Oops, incorrect answer. the correct answer is "{{ correctAnswer }}""</h4>
    <button v-if="submitAnswer" type="button" class="send" @click="getNewRequest()">Next question</button>
  </section>
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
