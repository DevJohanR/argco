<template>
  <div v-if="book" class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row md:space-x-6">
      <!-- Imagen del libro -->
      <div class="md:w-1/3">
        <img :src="book.cover" :alt="book.title" class="w-full h-[80vh] object-contain">
      </div>
      
      <!-- Detalles del libro -->
      <div class="md:w-2/3 mt-4 md:mt-0">
        <h3 class="text-2xl font-semibold">{{ book.title }}</h3>
        <p>{{ `${book.author.last_name}, ${book.author.first_name}` }}</p>
        
        <ul class="mt-2">
          <li><strong>ISBN:</strong> {{ book.isbn }}</li>
          <li><strong>Categoría:</strong> {{ book.category.name }}</li>
          <li><strong>Fecha de publicación:</strong> {{ formatDate(book.publication_date) }}</li>
        </ul>
        
        <p class="mt-4">{{ book.synopsis }}</p>
      </div>
    </div>
  </div>

  <div v-else class="container mx-auto p-4">
    <p>Cargando...</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['id'],
  computed: {
    ...mapState('books', { book: state => state.book })
  },
  methods: {
    ...mapActions('books', ['fetchBook']),
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', options);
    }
  },
  created() {
    this.fetchBook(this.id);
  }
}
</script>