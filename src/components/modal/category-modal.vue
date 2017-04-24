<template>
    <modal v-on:close="$emit('close')" v-on:save="$emit('close')">
        <h4 slot="header" class="modal-title">Pick some categories</h4>

        <div slot="body">
            <div class="alert alert-danger">This works in some way, but it won't work as long as it doesn't cooperate with json-server. The results can be filtered bases on category, but the pagination and sorting won't work anymore. :(</div>

            <div class="legend">
                <span class="legend-item" v-on:click="selectAllItems()">Select all</span> | 
                <span class="legend-item" v-on:click="unselectAllItems()">Unselect all</span>
            </div>
            <div class="btn-list">
                <button class="btn" v-bind:class="{ 'btn-default': !isSelected(category), 'btn-primary': isSelected(category) }" v-for="category in allCategories.available" v-on:click="toggleCategory(category)">{{category}}</button> 
            </div>
        </div>
    </modal>
</template>

<script>
    import modal from './modal';

    export default {
        name: 'categoryModal',
        components: {
            modal: modal
        },
        props: ['categories'],
        data: function() {
            return {
                allCategories: this.categories
            }
        },
        methods: {
            selectAllItems() {
                this.allCategories.selected = this.allCategories.available;
                this.update();
            },
            unselectAllItems() {
                this.allCategories.selected = [];
                this.update();
            },
            toggleCategory(category) {
                if (this.isSelected(category)) {
                    let indexOfCategory = this.allCategories.selected.indexOf(category);
                    this.allCategories.selected.splice(indexOfCategory, 1);
                } else {
                    this.allCategories.selected.push(category);
                }

                this.update();
            },
            isSelected(category) {
                return this.allCategories.selected.indexOf(category) > -1;
            },
            update() {
                this.$emit('update', this.allCategories.selected);
            }
        }
    }
</script>

<style lang="scss">
.legend {
    float: right;
    margin-bottom: 10px;

    &-item {
        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
}

.btn-list {
    clear: both;

    .btn {
        margin: 0 5px 5px 0;
    }
}
</style>