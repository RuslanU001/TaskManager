<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-select :value="value" @change="handleChange" @pressEnter="check" style="width: 120px">
        <a-select-option v-for="status in statuses" :value="status">{{ translate[status] }}</a-select-option>
      </a-select>
      <a-icon type="check" class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <a-badge :color="statusColor[value]" :text="translate[value]" />
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      editable: false,
      statuses: ['new', 'inProgress', 'done'],
      translate: {
        'new': 'Новое',
        'inProgress': 'В работе',
        'done': 'Готово'
      },
      statusColor: {
        'new': 'lime',
        'inProgress': 'yellow',
        'done': 'cyan',
      }
    };
  },
  computed: {
    value: function () { return this.text }

  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
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