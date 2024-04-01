<template>
  <section>
    <div class="container mx-auto px-3 pt-[80px]">
      <h1 class="title text-[#01002e] font-medium lg:text-5xl text-center">New day - new achievement</h1>
      <h2 class="text-[#01002e] text-right mt-10 mr-10">{{ currentDate }} | {{ currentDay }} </h2>
      <p class="text-[#01002e] text-3xl text-center cursor-pointer">Go to ⟶ <RouterLink to="/tasks">Tasks list </RouterLink></p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentDate = ref('');
const currentDay = ref('');

const updateDate = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString();
  currentDay.value = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
};

onMounted(() => {
  updateDate();
  setInterval(updateDate, 1000);
});
</script>

<style scoped>
.title {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  animation: 
    typing 4s steps(30, end),
    blink-caret .5s step-end infinite;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
}
a {
  text-decoration: none;
  
  display: inline-block;
  position: relative;
}
a:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #01002e;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
a:hover:after { 
  width: 100%; 
  left: 0; 
}
</style>