<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Cover</th>
                <th>Synopsis</th>
                <th>Fecha de Publicacion</th>
                <th>Autor</th>
                <th>Categoria</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in books" :key="book.id" @click="goToBookDetail(book.id)">
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td><img :src="book.cover" alt="Cover Image" width="100"></td>
                <td>{{ book.fecha_publicacion }}</td>
                <td>{{ book.autor }}</td>
                <td>{{ book.categoria }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'BooksTable',
    props: {
        books: {
            type: Array,
            required: true
        }
    },
    methods: {
        goToBookDetail(id) {
            this.$router.push({ name: 'BookDetails', params: { id } });
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}

img {
    max-width: 100px;
}

tbody tr {
    cursor: pointer;
}

tbody tr:hover {
    background-color: #f1f1f1;
}
</style>