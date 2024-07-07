<template>
  <div class="container mx-auto p-8">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-gray-800 border border-gray-600 rounded-lg">
        <thead>
          <tr class="uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">#</th>
            <th class="py-3 px-6 text-left">Título</th>
            <th class="py-3 px-6 text-left">Autor</th>
            <th class="py-3 px-6 text-center" colspan="2">Acciones</th>
          </tr>
        </thead>
        <tbody class="text-sm font-light">
          <BookRow
            v-for="(book, index) in books"
            :key="book.id"
            :book="book"
            :index="index + 1"
            class="border-b border-gray-600"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BookRow from '../components/BookRow.vue';

export default {
  components: {
    BookRow
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