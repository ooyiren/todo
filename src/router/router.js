import Vue from "vue";
import VueRouter from "vue-router";
import todo from "../components/todo.vue"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: todo,
        name: "todo"
    },];

// 创建router实例
const router = new VueRouter({
  routes
})

export default router;