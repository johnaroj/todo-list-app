<template>
<v-container class="grey lighten-5">
                <v-row>
                    <v-col
                        cols="12"
                        md="8"
                        d-flex
                               >
                <template v-if="todo">
                    <v-checkbox
                    :value="todo.completed"
                    :checked="todo.completed"
                    :label="todo.title"
                    ></v-checkbox>
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

                    </v-col>
                </v-row>
            </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useRoute } from '@nuxtjs/composition-api'
import axios, { AxiosResponse } from 'axios'

interface Todo{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export default defineComponent({
  setup() {
    const route = useRoute();
    const todo = ref<Todo>();
    const loading = ref(false); 
    
    const fetchTodo = async(id:string)=>{
      try {
          loading.value = true;
          const result = await axios.get('http://localhost:8080/todos/' + id)
          todo.value = result.data.data.body
          loading.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
       fetchTodo(route.value.params.id);
    })

    return {
      todo,
      loading
    }
  }
})
</script>