<template>
  <div class="h-90 p-8 flex flex-col text-left">
    <img 
      :src="book.cover" 
      :alt="book.title" 
      class="w-full h-48 md:h-80 object-fill mb-4"
    >
    <div class="flex-grow">
      <h3 class="text-lg font-semibold mb-2 truncate hover:text-orange-400">{{ book.title }}</h3>
    </div>
    <p class="text-gray-100">{{ `${book.author.last_name}, ${book.author.first_name}` }}</p>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>