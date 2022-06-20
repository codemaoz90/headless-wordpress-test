<template>
<div class="posts">
  <div v-if="loading">
      Loading .....
  </div>
  <main v-else>
    <h2>Posts</h2>
  <!-- here we loop through the posts -->
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>
      <!-- for each one of them, we’ll render their title, and link off to their individual page -->
        <a :href="`blog/${post.slug}`">{{ post.title.rendered }}</a>
      </h3>
      <div v-html="post.excerpt.rendered"></div>
      <a :href="`blog/${post.slug}`" class="readmore">Read more ⟶</a>
    </div>
    <aside>
    <h2>Categories</h2>
    <div class="tags-list">
      <ul>
        <li
           v-for="tag in tags"
          :key="tag.id">
            <a>{{ tag.name }}</a>
        </li>
      </ul>
    </div>
  </aside>
  </main>
  </div>
</template>

<script>
export default {
name: "IndexPage",
computed: {
  loading(){
    return this.$store.state.loaded
  },
  posts() {
    return this.$store.state.posts;
  },
  tags() {
    return this.$store.state.tags;
  },
 },
created() {
   this.$store.dispatch("getPosts");
   
},
};
</script>
