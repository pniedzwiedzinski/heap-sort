<template>
  <div>
    <div class="node" :id="id">{{array[id]}}</div>
    <div v-if="2*id+1 < array.length" class="node-wrapper">
      <heap :array="array" :id="2*id+1"/>
      <heap :array="array" :id="2*id+2"/>
    </div>
  </div>
</template>

<script>
import connectElements from "../connectElements";

export default {
  name: "heap",
  props: {
    array: {
      type: Array
    },
    id: {
      type: Number
    }
  },
  mounted() {
    connectElements(this.id, 2 * this.id + 1, "#fafafa", 0.1);
    connectElements(this.id, 2 * this.id + 2, "#fafafa", 0.1);
  }
};
</script>

<style>
.node {
  display: inline-block;
  margin: 20px;
  width: 36px;
  border: 1px solid #fafafa;
  background-color: #212121;
  color: #fafafa;
  /* z-index: 99; */
  padding: 5px;
}

.node-wrapper {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.highlighted {
  color: #45ff45;
}
</style>
