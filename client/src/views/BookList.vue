<template>
  <div class="books-view">
    <h1>Books List</h1>
    <BooksTable :books="books" />
  </div>
</template>

<script>
import axios from 'axios';
import BooksTable from '@/components/BooksTable.vue';

export default {
  name: 'BooksList',
  components: {
    BooksTable
  },
  data() {
    return {
      books: []
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      axios.get('deployurl/api/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Error al intentar conseguir el Libro', error);
        });
    }
  }
};
</script>

<style scoped>
.books-view {
  padding: 20px;
}
</style>