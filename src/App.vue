<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
  

    onMounted(() =>{
      axios.get('https://opentdb.com/api.php?amount=1')
      .then((response) => {
      console.log(response.data.results)
      })
    }
    )
</script>

<template>
 <div>
  <h1>Questões</h1>
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
