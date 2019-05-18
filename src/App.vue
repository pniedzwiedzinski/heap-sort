<template>
  <div id="app">
    <div>{{array}}</div>
    <button v-on:click="sort()"></button>
    <div id="heap" style="position: relative">
      <svg id="svg-canvas" width="891" height="897" xlink="http://www.w3.org/1999/xlink"></svg>
      <heap v-if="render" :array="array" :id="0"/>
    </div>
  </div>
</template>

<script>
import Heap from "./components/Heap.vue";
import { setTimeout } from "timers";
import { Promise } from "q";

function randomArray(n) {
  let array = [];
  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * 20));
  }
  return array;
}

let random = randomArray(7);

export default {
  name: "app",
  components: {
    Heap
  },
  data: () => ({
    array: random,
    render: true
  }),
  methods: {
    async swap(a, b) {
      return new Promise(r => {
        let tmp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = tmp;
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
      for (let i = Math.floor(this.array.length / 2) - 1; i >= 0; i--) {
        await this.heapify(this.array.length, i);
      }
      console.log("sort");
      for (let i = this.array.length - 1; i >= 0; i--) {
        // Move current root to end
        await this.swap(0, i);

        // call max heapify on the reduced heap
        await this.heapify(i, 0);
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
          console.log(n, largest);
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
  margin-top: 60px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
</style>
