<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex items-center justify-between">
      <router-link to="/" class="text-2xl font-bold">
        ARGCO
      </router-link>
      <nav>
        <ul class="flex gap-4">
          <li>
            <router-link to="/admin/books" class="text-white hover:text-orange-400">
              Libros
            </router-link>
          </li>
          <li>
            <router-link to="/admin/book/create" class="text-white hover:text-orange-400">
              Nuevo Libro
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script></script>