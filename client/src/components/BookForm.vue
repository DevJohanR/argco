<template>
  <form @submit.prevent="submitForm" class="max-w-md mx-auto p-6 m-8 bg-gray-800 shadow-md rounded-md">
    <!-- ISBN -->
    <div class="mb-4">
      <label for="isbn" class="block text-sm font-medium text-gray-300">ISBN</label>
      <input v-model="book.isbn" type="text" id="isbn" name="isbn" required
             class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      />
    </div>

    <!-- Título -->
    <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-gray-300">Título</label>
      <input v-model="book.title" type="text" id="title" name="title" required
             class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      />
    </div>

    <!-- Portada -->
    <div class="mb-4">
      <label for="cover" class="block text-sm font-medium text-gray-300">Portada</label>
      <input v-model="book.cover" type="text" id="cover" name="cover" required
             class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      />
    </div>

    <!-- Sinopsis -->
    <div class="mb-4">
      <label for="synopsis" class="block text-sm font-medium text-gray-300">Sinopsis</label>
      <textarea v-model="book.synopsis" id="synopsis" name="synopsis" rows="4" required
                class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      ></textarea>
    </div>

    <!-- Fecha de Publicación -->
    <div class="mb-4">
      <label for="publication_date" class="block text-sm font-medium text-gray-300">Fecha de Publicación</label>
      <input v-model="book.publication_date" type="date" id="publication_date" name="publication_date" required
             class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      />
    </div>

    <!-- Nombre del Autor -->
    <div class="mb-4">
      <label for="author_first_name" class="block text-sm font-medium text-gray-300">Nombre del Autor</label>
      <input v-model="book.author_first_name" type="text" id="author_first_name" name="author_first_name" required
             class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      />
    </div>

    <!-- Apellido del Autor -->
    <div class="mb-4">
      <label for="author_last_name" class="block text-sm font-medium text-gray-300">Apellido del Autor</label>
      <input v-model="book.author_last_name" type="text" id="author_last_name" name="author_last_name" required
             class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      />
    </div>

    <!-- Categoría -->
    <div class="mb-4">
      <label for="category_id" class="block text-sm font-medium text-gray-300">Categoría</label>
      <select v-model="book.category_id" id="category_id" name="category_id" required
              class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-300"
      >
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Guardar</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      book: {
        isbn: '',
        title: '',
        cover: '',
        synopsis: '',
        publication_date: '',
        author_first_name: '',
        author_last_name: '',
        category_id: 0
      },
    }
  },
  computed: {
    ...mapGetters('categories', ['allCategories']),
    ...mapGetters('books', ['currentBook']),
    categories() {
      return this.allCategories;
    }
  },
  watch: {
    currentBook: {
      handler(newBook) {
        if (newBook) {
          this.book = {
            isbn: newBook.isbn,
            title: newBook.title,
            cover: newBook.cover,
            synopsis: newBook.synopsis,
            publication_date: new Date(newBook.publication_date).toISOString().substr(0, 10),
            author_first_name: newBook.author.first_name,
            author_last_name: newBook.author.last_name,
            category_id: newBook.category.id
          };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('books', ['fetchBook', 'createBook', 'updateBook']),
    getBook() {
      if (this.id && this.id !== 'create') {
        this.fetchBook(this.id);
      }
    },
    submitForm() {
      if (this.id !== 'create') {
        this.updateBook({ id: this.id, book: this.book });
      } else {
        this.createBook(this.book);
      }

      this.$router.push('/admin/books');
    },
    resetForm() {
      this.book = {
        isbn: '',
        title: '',
        cover: '',
        synopsis: '',
        publication_date: '',
        author_first_name: '',
        author_last_name: '',
        category_id: 0
      };
    },
  },
  created() {
    this.fetchCategories();
    this.getBook();
  }
}
</script>