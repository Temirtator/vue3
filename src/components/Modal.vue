<!-- src/components/Modal.vue -->
<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click.self="onBackdrop"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="ariaLabelledby || undefined"
      >
        <div class="modal-window" ref="dialog" tabindex="-1" role="document">
          <header v-if="$slots.header" class="modal-header">
            <slot name="header"></slot>
            <button class="modal-close" @click="emitClose" aria-label="Close">✕</button>
          </header>

          <section class="modal-body">
            <slot></slot>
          </section>

          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  closeOnEsc: { type: Boolean, default: true },
  closeOnBackdrop: { type: Boolean, default: true },
  ariaLabelledby: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "close"]);

const show = ref<boolean>(props.modelValue);
const dialog = ref<HTMLElement | null>(null);

watch(
  () => props.modelValue,
  (v) => {
    show.value = v;
    if (v) focusDialog();
  }
);

watch(show, (v) => emit("update:modelValue", v));

function emitClose() {
  show.value = false;
  emit("close");
}

function focusDialog() {
  requestAnimationFrame(() => {
    dialog.value?.focus();
  });
}

function onBackdrop() {
  if (props.closeOnBackdrop) emitClose();
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && props.closeOnEsc) {
    emitClose();
  }
}

onMounted(() => {
  document.addEventListener("keydown", onKey);
  if (show.value) focusDialog();
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKey);
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 12, 15, 0.45);
  z-index: 1000;
  padding: 1rem;
}

.modal-window {
  background: white;
  border-radius: 10px;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.3);
  outline: none;
  padding: 1rem;
}

/* header/footer */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.modal-close {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
}

/* body */
.modal-body {
  padding: 0.75rem 0;
}

/* footer */
.modal-footer {
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0,0,0,0.06);
  display:flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* simple fade/scale */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 180ms ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.995);
}
</style>
