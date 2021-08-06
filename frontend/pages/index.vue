<template>
 <v-card>
   <template v-if="!loading">
      <v-list two-line>
     <template v-for="todo in todos">
       <v-list-item
          :key="todo.id"
          @click="router.push('/' + todo.id)"
          link
        >
          <v-list-item-content>
            <v-list-item-title v-html="todo.title"></v-list-item-title>
            <v-list-item-subtitle v-html="todo.body"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

     </template>
   </v-list>
   </template>
   <template v-else>
    <v-overlay
      :opacity="1"
      :value="loading"
      >
          <v-progress-circular indeterminate size="64">
              Loading...
          </v-progress-circular>
      </v-overlay>
   </template>

 </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted , useRouter} from '@nuxtjs/composition-api'
import axios, { AxiosResponse } from 'axios'

interface Todo{
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default defineComponent({
  setup() {
    const todos = ref<Todo[]>([]);
    const loading = ref(false); 
    const router = useRouter()
    
    const fetchTodos = async()=>{
      try {
          loading.value = true;
          const result = await axios.get('http://localhost:8080/todos')
          todos.value = result.data.data.body
          loading.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(async() => {
      await fetchTodos();
    })
    console.log(todos.value)
    return {
      todos,
      loading,
      router
    }
  }
})
</script>
