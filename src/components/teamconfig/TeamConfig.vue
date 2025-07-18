<template>
  <div class="teamConfigBlock">
    <input
      class="editingInput"
      type="text"
      name="editedValue"
      :value="modelValue"
      @input="handleInput"
      @keydown="handleKeyDown"
    />
    <div class="editingButtons">
      <button class="saveButton" @click="$emit('save')">Save</button>
      <button class="cancelButton" @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },

    handleKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.$emit('save');
      }
    },
  },
  emits: ['save', 'cancel', 'update:modelValue'],
};
</script>

<style lang="scss" scoped>
.teamConfigBlock {
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 5px;
  margin-right: 5px;
}

.editingInput {
  padding: 0.5rem;
  border: none;
  outline: none;
  margin-right: 5px;
  color: #595959;
  font-size: 13px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.editingInput:hover {
  cursor: pointer;
}

.editingButtons {
  display: flex;
  gap: 4px;
  margin-bottom: 9px;
}

.saveButton,
.cancelButton {
  margin-right: 5px;
  border: none;
  outline: none;
  border-radius: 10px;
  height: 31px;
  width: 60px;
  font-size: 13px;
  background-color: transparent;
  cursor: pointer;
}

.saveButton:hover {
  background-color: rgb(226, 226, 222);
}

.cancelButton:hover {
  background-color: rgb(226, 226, 222);
}

@media (max-width: 768px) {
  .editingInput {
    width: 100%;
    font-size: 12px;
  }

  .editingButtons {
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  }

  .saveButton,
  .cancelButton {
    width: 100%;
    font-size: 12px;
  }
}
</style>
