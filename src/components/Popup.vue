<script setup lang="ts">

const props = defineProps({
    buttonMessage:{
        type: String,
        required: true
    }
})

const emit = defineEmits<{
    (event: 'closePopup'): void
}>()

</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <button @click="() => {emit('closePopup')}" class="popup-close">
                {{ props.buttonMessage }}
            </button>
        </div>
    </div>
</template>

<style scope>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFF;
        padding: 32px;
    }
}
</style>