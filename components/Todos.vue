<template>
<v-container class="grey lighten-5">
  <v-row>
      <v-col
        cols="12"
        md="8"
        d-flex
      >
        <h1>ToDo list</h1> tasks {{todos.filter(t=>t.done).length}}/{{todos.length}}
      </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="8">
      <v-form @submit.prevent="addNewTodo">
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
            v-model="newTodo"
            label="New Todo"
            required
            ></v-text-field>
          </v-col>
        </v-row>
                <v-row>
          <v-col cols="12" md="8">
            <v-btn type="submit"
            >Add New Todo</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
  <v-row>

  </v-row>

      <div v-for="todo in todos" :key="todo.id">
          <v-row>
            <v-col cols="4">
              <v-container
                class="px-0"
                fluid
              >
                <v-checkbox
                  :value="todo.done"
                  :checked="todo.done"
                  v-on:change="toggleTodo(todo)"
                  :label="todo.content"
                ></v-checkbox>
              </v-container>

            </v-col>
            <v-col cols='8'>
                            <v-container
                class="px-0"
                fluid
              >
                              <v-btn @click="removeTodo(todo)">Remove Todo</v-btn>
                            </v-container>
            </v-col>
            
          </v-row> 

      </div>

</v-container>

</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import axios, { AxiosResponse } from 'axios'
interface Todo{
  id: number;
  done: boolean;
  content: string
}
export default defineComponent({
  setup() {
    const newTodo = ref('');
    const todos = ref<Todo[]>([]);

    axios.get('http://localhost:8000/todos').then((data: AxiosResponse) => todos.value = data.data);

    const addNewTodo=async()=>{
      const result =await axios.post('http://localhost:8000/todos',{
        id:Date.now(),
        done: false,
        content: newTodo.value
      })
      if(result.status === 201){
      todos.value?.push(result.data)
      }

      newTodo.value = '';
    }
    const toggleTodo=async (todo:Todo)=>{
      const result =await axios.put('http://localhost:8000/todos/'+todo.id, {
        content:todo.content,
        done:!todo.done
      });

      if(result.status === 200){
        let index = todos.value.findIndex(t=> t.id === todo.id);
        todos.value = [...todos.value.slice(0,index), result.data,...todos.value.slice(index + 1)]
      }

       
     }
    const removeTodo = async(todo: Todo)=>{
        const result =await axios.delete('http://localhost:8000/todos/'+todo.id);

        if(result.status === 200){
        let index = todos.value.findIndex(t=> t.id === todo.id);
        todos.value.splice(index,1);
        }

    }
    return {
      addNewTodo,
      newTodo,
      todos,
      toggleTodo,
      removeTodo
    }
  },
})
</script>

<style>
.v-input--is-label-active.v-input--checkbox label {
  text-decoration: line-through;
}
</style>