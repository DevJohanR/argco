<template>
  <tr class="border-b border-gray-600 text-white">
    <td class="py-3 px-6 text-left">{{ index }}</td>
    <td class="py-3 px-6 text-left">{{ book.title }}</td>
    <td class="py-3 px-6 text-left">{{ `${book.author.last_name}, ${book.author.first_name}` }}</td>
    <td class="py-3 px-6 text-center">
      <button class="hover:underline hover:text-yellow-400">
        <router-link :to="'/admin/book/' + this.book.id">Editar</router-link>
      </button>
    </td>
    <td class="py-3 px-6 text-center">
      <button class="hover:underline hover:text-red-400" @click="handleDelete">Eliminar</button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    book: Object,
    index: Number
  },
  methods: {
    handleDelete() {
      if (confirm(`¿Estás seguro de eliminar el libro "${this.book.title}"?`)) {
        this.deleteBook(this.book.id);
      }
    },
    ...mapActions('books', ['deleteBook']),
  }
}
</script>