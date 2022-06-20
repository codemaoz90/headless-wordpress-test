// State
export const state = () => ({
    loaded : false,
    posts: [],
    tags: []
})

// Getters
export const getters = {
    getterValue: state => {
        return state.posts
    }
}

// Mutations
export const mutations = {
    updatePosts(state, posts){
        state.posts = posts
    },
    updateTags: (state, tags) => {
      state.tags = tags
    },
    SET_LOADED(state,status){
        state.loaded = status
    }
}

// Actions
export const actions = {
    async getPosts({ state, commit, dispatch }) {
      if (state.posts.length) return
      try {
        commit('SET_LOADED', true)
        let posts = await fetch( `https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
        ).then(res => res.json())
        posts = posts
          .filter(el => el.status === "publish")
          .map(({ id, slug, title, excerpt, date, tags, content }) => ({
            id,
            slug,
            title,
            excerpt,
            date,
            tags,
            content
          }))
        commit("updatePosts", posts)
        dispatch('getTags', posts)
     
      } catch (err) {
        console.log(err)
      }
   },
   async getTags({ state, commit }, posts) {
    if (state.tags.length) return
    let allTags = posts.reduce((acc, item) => {
      return acc.concat(item.tags);
    }, [])
    allTags = allTags.join()
    try {
      let tags = await fetch(
        `https://css-tricks.com/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`
      ).then(res => res.json())
      tags = tags.map(({ id, name }) => ({
        id, name
      }))
      commit("updateTags", tags)
      commit('SET_LOADED', false)
    } catch (err) {
      console.log(err)
    }
  }
  
}
