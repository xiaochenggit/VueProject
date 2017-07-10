<template>
	<div class="todoList">
		<input type="text" v-model='todo'>
		<button @click="addTodo">Add</button>
		<ul v-if="todos.length > 0">
			<li v-for="(item, index) in todos" @click="deleteTodo(index)">
				{{index + 1}} - {{item}}
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props:['todos'],
	data() {
		return {
			todo: ''
		}
	},
	methods: {
		addTodo: function(){
			if (!this.todo.trim()) {
				alert('不能为空！');
				return false;
			}
			this.todos.push(this.todo);
			this.todo = '';
			this.saveTodos();
		},
		deleteTodo: function(index) {
			this.todos.splice(index, 1);
			this.saveTodos();
		},
		saveTodos: function() {
			localStorage.setItem('todos',JSON.stringify(this.todos));
		},
		getTodos: function() {
			let todos = localStorage.getItem('todos');
			todos = todos ? JSON.parse(todos) : [];
			this.todos = todos;
		}
	}
}
</script>
<style scoped>
	
</style>