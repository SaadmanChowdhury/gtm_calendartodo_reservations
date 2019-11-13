<!-- 
    
    CALLED BY: App.vue
    
 -->

<template>
            
        <div class="modal-card" style="width: 140%; height: 600px;" >

            <header class="modal-card-head">
                <p class="modal-card-title">{{year}}年 {{month}}月 {{day}}日</p>
            </header>

            <section class="modal-card-body">
                <b-field label="用事"></b-field>

                <ul>
                    <li v-for="(todo,i) in todayTodos" :key="i" :style="{color:todo.color}"
                        style=" overflow: hidden;
                                white-space: nowrap;"> 

                        <div
                             
                            v-bind:class="{strike:todo.isComplete}">

                            <input v-if="todo.show" v-model="todo.description"
                                    style="font-size: 16px; width:parent; display: inline-block;"
                                @blur= "todo.show = false; $emit('update')"
                                @keyup.enter = "todo.show=false; $emit('update')"
                                v-focus>

                            <div v-else>
                                <label> 
                                    • {{todo.description}}
                                </label>
                            </div>
                        </div>

                        <button class="button" id="toggle" style="float:right; display: inline-block;"
                                v-on:click="todo.show = true">
                            修正
                        </button>

                        <button class="button" id="toggle" style="float:right; display: inline-block;"
                                v-on:click="todo.isComplete = !todo.isComplete">
                            完了
                        </button>
                        
                    </li>
                </ul>

            </section>
            <footer class="modal-card-foot">
                <!-- <b-modal :component="Todo" @update-event="updateTodayTodos"></b-modal> -->
                <button class="button" style="float:left" type="button" @click="$parent.close()">閉じる</button>
                <button class="button is-primary" style="float:left" @click="openTodoModal()">新しい</button>
            </footer>
        </div>
            
</template>

<script>

import Todo from "./Todo.vue";

export default {
    
    // @PROPS: { propDayObj: dayClickObject, propTodos: [TodoObjects] }
    // @ToDoObjects: description: "String", isComplete: bool, dates: [dayObjects], color: "color"
    // Used by Day.vue, Todo.vue

    name: "day-form",
    props: ['propDayObj', "propTodos"],
    
    data(){
        return{

            day: "",
            month: "",
            year: "",

            todayTodos: "",
            isEditable:[],
        };
    },
    methods:{
        logger: function(comment){
            let outputText = "## Day.vue ##\n\n" + comment;
            console.log(outputText);
        },
        importantLogger: function(comment){
            let outputText = "\n\n## Day.vue ##\n\n" + comment +"\n\n";
            console.log(outputText);
        },

        openTodoModal(){
            console.log(this.propDayObj);
            const modal = this.$buefy.modal.open({
                parent: this,
                component: Todo,
                hasModalCard: true,
                customClass: 'custom-class custom-class-2',
                props:{propDayObj: this.propDayObj, propTodos:this.propTodos}, 
                // events: {
                //     "updateParent": value=> { 
                //         value.updateTodayTodos();
                //         console.log(value);
                //     }
                // },
            });

            modal.$on('close', () => {
                this.updateTodayTodos();
            });
            // this.updateTodayTodos();
        },

        updateTodayTodos(){
            let tempTasks = [];
            let tempDate = "";

            this.importantLogger("Called updateTodayTodos() O(n^2)");
            console.log(this.propTodos);
        
            for(let i=0; i<this.propTodos.length; i++){

                for(let j=0; j<this.propTodos[i].dates.length; j++){

                    tempDate = String(this.propTodos[i].dates[j].getDate()).padStart(2, '0');

                    if(this.day == tempDate){
                        tempTasks.push(this.propTodos[i]);
                        this.isEditable.push(false);
                    }
                }
            }
            this.todayTodos = tempTasks;
        }
    },
    computed:{
        
    },
    created(){

        this.importantLogger("Created for: " + this.propDayObj.id);

        this.day = this.propDayObj.day;
        this.month = this.propDayObj.month;
        this.year = this.propDayObj.year;

        this.updateTodayTodos();
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
        }
  },
}
</script>

<style scoped>


li {
    /* height: 30px; */
    border-style: solid;
    border-color: rgb(198, 182, 218);
    border-width: 1px 1px 1px 1px;
    border-radius: 20px;
    margin: 5px 0px;
    padding: 10px;
    overflow: auto;
}

li:hover{
    /* background: purple; */
    background: rgb(250, 240, 255);
    cursor: pointer;
    user-select: none;
}



.strike{
    text-decoration: line-through;
    color: gray;
}
</style>