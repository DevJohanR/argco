<template>
  <div class="container mx-auto p-4">
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <router-link
        v-for="book in books"
        :key="book.id"
        :to="'/book/' + book.id"
        class="block"
      >
        <BookCard :book="book" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BookCard from '../components/BookCard.vue';

export default {
  components: {
    BookCard
  },
  computed: {
    ...mapState('books', { books: state => state.books}),
  },
  methods: {
    ...mapActions('books', ['fetchBooks']),
  },
  created() {
    this.fetchBooks();
  }
}
</script>
