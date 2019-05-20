<template>
  <div id="app">
    <repo link="https://github.com/pniedzwiedzinski/heap-sort"/>
    <!--Length:
    <input type="number" v-model="length" @change="generateArray">-->
    <!--<div class="array">
      <p>[</p>
      <div v-for="a in array" v-bind:key="a" v-bind:id="'a'+a.toString()">
        <p v-bind:class="done.includes(a) ? 'item' : 'done'">{{a}},</p>
      </div>
      <p>]</p>
    </div>-->
    {{array}}
    <button v-on:click="sort()">Sort!</button>
    <div v-if="render && this.graphArray.length > 0" id="heap" style="position: relative">
      <svg id="svg-canvas" width="100%" height="100%" xlink="http://www.w3.org/1999/xlink"></svg>
      <heap :array="graphArray" :id="0"/>
    </div>
    {{sorted}}
  </div>
</template>

<script>
import Heap from "./components/Heap.vue";
import Repo from "./components/Link.vue";
import { setTimeout } from "timers";
import { Promise } from "q";

export default {
  name: "app",
  components: {
    Heap,
    Repo
  },
  created() {
    this.generateArray();
  },
  data: () => ({
    array: [],
    graphArray: [],
    sorted: [],
    length: 7,
    render: true,
    //done: [],
    isSorting: false
  }),
  methods: {
    randomArray(n) {
      let array = [];
      for (let i = 0; i < n; i++) {
        // TODO: fix complexity
        while (true) {
          let r = Math.floor(Math.random() * (this.length + 1));
          if (!array.includes(r)) {
            array.push(r);
            break;
          }
        }
      }
      return array;
    },
    generateArray() {
      this.array = this.randomArray(this.length);
      this.graphArray = Array(...this.array);
      this.render = false;
      this.$nextTick(() => {
        // Add the component back in
        this.render = true;
      });
    },
    async swap(a, b) {
      return new Promise(r => {
        let tmp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = tmp;
        tmp = this.graphArray[a];
        this.graphArray[a] = this.graphArray[b];
        this.graphArray[b] = tmp;
        this.render = false;
        this.$nextTick(() => {
          // Add the component back in
          this.render = true;
        });
        setTimeout(async () => {
          await this.highlight(a, b);
          setTimeout(() => r("a"), 500);
        }, 100);
      });
    },
    async highlight(a, b) {
      return new Promise(r => {
        const aElement = document.getElementById(a.toString());
        const bElement = document.getElementById(b.toString());
        aElement.classList.add("highlighted");
        bElement.classList.add("highlighted");
        setTimeout(() => {
          aElement.classList.remove("highlighted");
          bElement.classList.remove("highlighted");
          r("a");
        }, 1500);
      });
    },
    async sort() {
      if (this.graphArray.length === 0) {
        this.sorted = [];
        this.graphArray = Array(...this.array);
      }
      if (this.isSorting) {
        return;
      } else {
        this.isSorting = true;
        for (let i = Math.floor(this.array.length / 2) - 1; i >= 0; i--) {
          await this.heapify(this.array.length, i);
        }
        for (let i = this.array.length - 1; i >= 0; i--) {
          // Move current root to end
          await this.swap(0, i);
          //this.done.push(a);
          this.sorted.push(this.graphArray[i]);
          this.graphArray.pop(i);

          // call max heapify on the reduced heap
          await this.heapify(i, 0);
          this.isSorting = false;
        }
      }
    },
    async heapify(n, i) {
      return new Promise(async r => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && this.array[largest] < this.array[left]) {
          largest = left;
        }

        if (right < n && this.array[largest] < this.array[right]) {
          largest = right;
        }

        if (largest !== i) {
          await this.swap(i, largest);
          await this.heapify(n, largest);
        }
        r();
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fafafa;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
}
html {
  background-color: #212121;
}

svg {
  position: absolute;
  top: 0px;
  left: 0px;
}

.array {
  display: flex;
  flex-direction: row;
}
</style>
