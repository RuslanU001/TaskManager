<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-select :value="text" @change="handleChange" @pressEnter="check" style="width: 120px">
        <a-select-option
          v-for="status in statuses"
          v-if="text !== status"
          :value="status"
        >{{ status }}</a-select-option>
      </a-select>
      <a-icon type="check" class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ text }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
  data() {
    return {
      editable: false,
      statuses: ['new', 'inProgress', 'done']
    };
  },
  methods: {
    handleChange(value) {
      this.text = value;
    },
    check() {
      this.editable = false;
      this.$emit('change', this.text);
    },
    edit() {
      this.editable = true;
    },
  },
}
</script>