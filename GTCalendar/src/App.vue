<!-- 
    (!)(!)(!)(!)(!) DISCRIPENCIES:

    -> openDayModal(e) is searching in O(n^2) fashion -- reduce the complexity
    
 -->

<!-- 
    TO DO:


    -> Connect to database


    COMPLETED TODAY:


        

    PROBLEMS FACED:
    -> Tried to change day names to Japanese day names, but could not find the right documentation for that.
 -->


<template>
  <div id="app">

    <div id="calendar">

      <v-date-picker  :attributes="attributes" 
                      @dayclick='openDayModal' 
                      color= "purple"
                      locale = "custom"
                      :available-dates='{ start:new Date(), end:null, }'
                      :columns="layout.columns"
                      :rows="layout.rows"
                      :is-expanded="layout.isExpanded"
                      :value="null" 
                      title-position="left"
                      is-inline>
                      <!-- @click="launchTodo(e)"> -->
      </v-date-picker>

      <button class="button is-primary is-medium" @click="openTodoModal">+</button>

    </div>

  </div>
</template>

<script>

import Todo from "./components/Todo.vue";
import Day from "./components/Day.vue";

export default {

  name: 'app',
  components:{
  },

  data () {
    // @ToDoObjects: description: "String", isComplete: bool, dates: [dayObjects], color: "color"
    // Used by Day.vue, Todo.vue
    let todos = [
      {
        description: "家で掃除する",
        isComplete: true,
        dates: [new Date(2019,10,30)],
        color: "green",
        show: false,
      },
      {
        description: "料理をする",
        isComplete: true,
        dates: [new Date(2019,10,3)],
        color: "green",
        show: false,
      },
      {
        description: "買い物に行く",
        isComplete: true,
        dates: [new Date(2019,10,3)],
        color: "green",
        show: false,
      },
      {
        description: "友達と会う",
        isComplete: true,
        dates: [new Date(2019,10,3)],
        color: "orange",
        show: false,
      },
      {
        description: "中村さんがくれたビデオを見る",
        isComplete: false,
        dates: [new Date(2019,10,8), new Date(2019,10,9), new Date(2019,10,10)],
        color: "red",
        show: false,
      },
      {
        description: "宮崎北高校で発表する",
        isComplete: false,
        dates: [new Date(2019,10,9)],
        color: "blue",
        show: false,
      },
      {
        description: "宮崎大学祭り",
        isComplete: false,
        dates: [new Date(2019,10,16),new Date(2019,10,17)],
        color: "green",
        show: false,
      }
    ];
    return {
      isTodoModalActive: "false",
      incId: todos.length,
      todos,
    };
  },
  methods: {

    logger: function(comment){
        let outputText = "## App.vue ##\n\n" + comment;
        console.log(outputText);
    },
    importantLogger: function(comment){
        let outputText = "\n\n## App.vue ##\n\n" + comment +"\n\n";
        console.log(outputText);
    },

    // @PROPS: { propDayObj: dayClickObject, propTodos: [this.todos] }
    // @ToDoObjects: description: "String", isComplete: bool, dates: [dayObjects], color: "color"
    openTodoModal(){
        this.$buefy.modal.open({
            parent: this,
            component: Todo,
            hasModalCard: true,
            customClass: 'custom-class custom-class-2',
            props:{propDayObj: null, propTodos:this.todos},
        })
    },

    // @PROPS: { propDayObj: dayClickObject, propTodos: [this.todos] }
    // @ToDoObjects: description: "String", isComplete: bool, dates: [dayObjects], color: "color"
    openDayModal(e){
      console.log(e);

      this.$buefy.modal.open({
          parent: this,
          component: Day,
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          props:{propDayObj: e, propTodos:this.todos},
      });
    }
  },
  computed: {

    attributes() {
      return[
        {
          key: "today",
          highlight: {
          color: "purple",
          fillMode: "light",
          },
          dates: new Date(),
        },

        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot:{
            color: todo.color,
            opacity: todo.isComplete ? 0.3 : 1,
          },
          popover:{
            label: todo.description,
            visibility: todo.visibility,
          },
          customData: todo,
        })),
      ];
    },

    layout(){
      return this.$screens({

        // Default for Small Screens
        default:{
          columns: 1,
          rows: 1,
          isExpanded: true,
        },

        // Default for Large Screens
        lg:{
          columns: 1,
          rows: 1,
          isExpanded: true,
        },
      });
    },
  },
}
</script>

<style>
.button{
  /* border: 15px solid red; */
  float: right;
  margin-right: 5%;
  margin-top: 20px;
}
</style>



<!-- 

    CHANGE LOG:

    CREATED - 11月 07日 2019年

    11月　08日 (金) ::
    -> Created the calendar and update visuals using v-calendar
    -> Added Day.vue and Todo.vue Modal functionality using Buefy

    11月　11日 (月) ::
    -> Refactor code, add comments
    -> Fix bug where the Day.vue modal would not display tasks which require multiple days to complete
    -> Add color to todoList items in Day.vue
    -> Todo.vue modal sends back data to App.vue, and adds new todo to todos[]

    11月 12日 (火) ::
    -> Solve bug which prevented new tasks from being seen in the calendar
    -> Show completed todos as strikes
    

    11月 13日　(水) ::

    -> Option to remove/complete todos in Day.vue
    -> Solve a bug in the calendar, which saves a new task, but does not show its preview.
    
-->