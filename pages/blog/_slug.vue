<template>
<div v-if="$store.state.loaded"> Loading....</div>
<main v-else class="post individual">
   <h1>{{ post.title.rendered }}</h1>
  <section v-html="post.content.rendered"></section> 
  <pre>{{ post.title.rendered }}</pre>
</main>
</template>


<script>
export default {
    data() {
        return {
            slug: this.$route.params.slug
        }
    },
    computed: {
        posts() {
            return this.$store.state.posts;
        },
        post(){
           return  this.posts.find(el => el.slug === this.slug)
        }
    },
    created() {
        this.$store.dispatch("getPosts");
    }
    };
</script>


<style lang="scss" scoped>

</style>