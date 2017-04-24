<template>
    <transition name="modal">
        <div class="modal-container">
            <div class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="$emit('close')" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <slot name="header">default header</slot>
                        </div>
                        <div class="modal-body">
                            <slot name="body">default body</slot>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="$emit('close')">Close</button>
                            <button type="button" class="btn btn-primary" @click="$emit('save')">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade in" @click="$emit('close')"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal'    
    }
</script>

<style lang="scss">
.modal {
    display: block;
    transition: opacity .3s ease;

    &-container {
        position: relative;
        z-index: 10000;
        transition: all .3s ease;
    }

    &-enter {
        opacity: 0;
    }

    &-leave-active {
        opacity: 0;
    }

    &-enter .modal-container,
    &-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
}
</style>