<template>
    <div class="gallery" v-bind:style="{ borderRadius: borderRadius }">
        <label>
            <input type="checkbox" v-model="show" />
            Show
        </label>
        <br><br>
        <input type="text" v-model="input" /> <br />Output: <code>{{input}}</code>
        <br><br>
        <div class="gallery-list" v-show="show">
            <div class="gallery-item" v-for="item in items">Gallery item {{item}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gallery',
        props: ['items', 'borderRadius'],
        data: function() {
            return { 
                show: true,
                code: ''
            };
        },
        computed: {
            input: {
                get() {
                    return this.$store.state.code;
                },
                set(value) {
                    this.$store.commit('setCode', value);
                }
            }
        }
    }
</script>