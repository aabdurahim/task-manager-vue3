<template>
  <div v-if="isModalOpen" class="modal bg-black bg-opacity-50">
    <img @click="closeModal" src="/icons/close.svg" class="absolute cursor-pointer top-[15%] right-[10%] w-[25px] h-[25px] float-right mr-5" alt="">
    <div class="container mx-auto md:w-3/5 px-3 py-10 bg-white rounded-[20px]">
      <form @submit.prevent="createOrUpdateTask" class="w-1/2 mx-auto justify-center items-center flex flex-wrap mt-5">
        <h2 class="text-center text-3xl font-medium">{{ taskToUpdate ? 'Edit current task' : 'Add new task' }}</h2> 
        <input v-model="taskTitle" type="text" placeholder="Заголовок" class="border border-b-[#01002e] p-3 mt-10 w-full">
        <input v-model="taskDescription" type="text" placeholder="Описание" class="border border-b-[#01002e] p-3 mt-10 w-full">
        <button type="submit" class="text-2xl font-medium text-[#01002e] bg-[#5ebfdf] bg-opacity-50 hover:bg-opacity-100 hover:text-white px-7 py-2 mt-10 rounded-[10px]">
          {{ taskToUpdate ? 'Update' : 'Add' }}
        </button>
      </form>
    </div>  
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { useTaskStore } from '../stores/TaskStore';

const props = defineProps(["isModalOpen", "taskToUpdate"]);
const emit = defineEmits(["close"]);
const taskTitle = ref('');
const taskDescription = ref('');

const taskStore = useTaskStore();

watch(() => props.taskToUpdate, (newVal) => {
  if (newVal) {
    taskTitle.value = newVal.taskTitle;
    taskDescription.value = newVal.taskDescription;
  }
});

const createOrUpdateTask = () => {
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();

  if (!title || !description) {
    return;
  }

  if (props.taskToUpdate) {
    taskStore.updateTask(props.taskToUpdate.id, { taskTitle: title, taskDescription: description });
  } else {
    taskStore.addTask(title, description);
  }

  resetForm();
  closeModal()
};

const resetForm = () => {
  taskTitle.value = '';
  taskDescription.value = '';
};

const closeModal = () => {
  emit("close");
  resetForm();
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
</style>
