<template>
  <section>
    <div class="container mx-auto px-3 pt-[80px]">
      <h2 class="text-[#01002e] font-medium text-5xl text-center">Task List</h2>
      <div class="bg-white rounded-[20px] md:w-3/5 mx-auto mt-5 py-5 px-3">
        <ol class="list-decimal mx-5">
          <li v-for="task in tasksList" :key="task.id" class="mt-5">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="ml-2">{{ task.taskTitle }}</h3>
                <p class="ml-5">{{ task.taskDescription }}</p>
              </div>
              <div class="flex items-center">
                <button @click="editTask(task)" class="mr-5"><img src="/icons/edit.svg" alt=""></button>
                <button @click="deleteTask(task.id)"><img src="/icons/delete.svg" alt=""></button>
              </div>
            </div>
          </li>
        </ol>
        <button @click="openAddModal" class="inline-flex items-center px-4 py-2 mt-5 rounded-full bg-[#5ebfdf] bg-opacity-50 cursor-pointer hover:bg-opacity-100">
          <img src="/icons/plus.svg" class="w-[30px] h-[30px]" alt="">
          <p class="text-xl ml-2 font-medium">Add task</p>
        </button>
      </div>
    </div>
    <Modal :isModalOpen="isModalOpen" :taskToUpdate="taskToUpdate" @close="closeModal" />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useTaskStore } from '../stores/TaskStore';
import Modal from './ModalForm.vue';

const isModalOpen = ref(false);
const taskToUpdate = ref(null);

const openAddModal = () => {
    isModalOpen.value = true;
    taskToUpdate.value = null;
};

const closeModal = () => {
    isModalOpen.value = false;
    taskToUpdate.value = null;
};

const taskStore = useTaskStore();
const { tasksList } = storeToRefs(taskStore);
const { deleteTask } = taskStore;

const editTask = (task) => {
    isModalOpen.value = true;
    taskToUpdate.value = task;
};

</script>


<style scoped>

</style>
