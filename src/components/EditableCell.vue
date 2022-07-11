<template>
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-select :value="value" @change="handleChange" @pressEnter="check">
            <a-select-option value="new">
                new
            </a-select-option>
            <a-select-option value="inProgress">
                inProgress
            </a-select-option>
            <a-select-option value="done">
                done
            </a-select-option>
          </a-select>
          <a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
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
        value: this.text,
        editable: false,
        };
    },
    methods: {
        handleChange(value) {
            this.value = value;
        },
        check() {
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
        },
    },

}

</script>
  

