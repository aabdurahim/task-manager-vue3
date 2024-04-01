// TaskStore.js

import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasksList: [],
    id: 0
  }),
  actions: {
    addTask(taskTitle, taskDescription) {
      const task = { id: this.id++, taskTitle, taskDescription };
      this.tasksList.push(task);
      this.saveTasks(); // Сохраняем задачи после добавления новой
    },
    deleteTask(taskId) {
      this.tasksList = this.tasksList.filter(task => task.id !== taskId);
      this.saveTasks(); // Сохраняем задачи после удаления
    },
    updateTask(taskId, updatedTask) {
      const taskToUpdate = this.tasksList.find(task => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.taskTitle = updatedTask.taskTitle;
        taskToUpdate.taskDescription = updatedTask.taskDescription;
        this.saveTasks(); // Сохраняем задачи после обновления
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasksList));
    },
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasksList = JSON.parse(storedTasks);
        this.id = this.tasksList.length > 0 ? this.tasksList[this.tasksList.length - 1].id + 1 : 0;
      }
    }
  }
});
