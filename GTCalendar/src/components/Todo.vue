<!-- 
    
    CALLED BY: App.vue
    
 -->

<template>
            <form action="">
                <div class="modal-card" style="width: 100%; height: 500px;" >
                    <header class="modal-card-head">
                        <p class="modal-card-title">用事を追加する</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="日付"></b-field>

                        <v-date-picker 　v-model="date"
                                        locale = "jp"
                                        :disabled-dates='{ weekdays: [1, 7], start:null, end:new Date() }'/>

                        <b-field label="用事">
                            <b-input
                                type="text"
                                :value="inputVal"
                                v-model="inputVal"
                                placeholder="新しいする事"
                                required>
                            </b-input>
                        </b-field>

                        <b-checkbox>緊急？</b-checkbox>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">閉じる</button>
                        <button class="button is-primary" type="button" @click="addTodo">保存する</button>                        
                    </footer>
                </div>
            </form>
</template>

<script>
export default {
    
    name: "todo",
    props: ["propDayObj", "propTodos"],
    
    data(){
        return{
            date: "",
            inputVal: "",
        }
    },
    methods:{
        logger: function(comment){
            let outputText = "## Todo.vue ##\n\n" + comment;
            console.log(outputText);
        },
        importantLogger: function(comment){
            let outputText = "\n\n## Todo.vue ##\n\n" + comment +"\n\n";
            console.log(outputText);
        },

        // @ToDoObjects: description: "String", isComplete: bool, dates: [dayObjects], color: "color"
        addTodo(){
            //alert(this.inputVal);
            this.propTodos.push({
                description: this.inputVal,
                isComplete: false,
                dates: [this.date],
                color: "blue",
                show: false,
            });
            // this.$emit("updateParent", this);
            // this.$parent.updateTodayTodos();
            this.$emit("update");
            this.$parent.close();
        }
    },
    created(){
        console.log(this.propTodos);
        console.log(this.propDayObj);
        
        if(this.propDayObj == null){
            this.date = new Date();
        }
        else{
            this.logger("Called Specific Date");
            this.date = new Date(this.propDayObj.year,this.propDayObj.month-1,this.propDayObj.day);
            // this.date = new Date();
        }
    }
}
</script>

<style scoped>
.button{
    float: left;
}
</style>