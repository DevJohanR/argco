import bookService from "../services/bookService";
import { toast } from "vue3-toastify";

export default {
  namespaced: true,
  state: {
    books: [],
    book: null,
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
    },
    SET_BOOK(state, book) {
      state.book = book;
    },
  },
  actions: {
    fetchBooks({ commit }) {
      bookService
        .getBooks()
        .then((response) => {
          commit("SET_BOOKS", response.data);
        })
        .catch((error) =>
          toast("Error al obtener libros", {
            theme: "dark",
            type: "error",
            dangerouslyHTMLString: true,
          })
        );
    },
    fetchBook({ commit }, id) {
      bookService
        .getBook(id)
        .then((response) => {
          commit("SET_BOOK", response.data);
        })
        .catch((error) =>
          toast("Error al obtener libro", {
            theme: "dark",
            type: "error",
            dangerouslyHTMLString: true,
          })
        );
    },
    createBook({ dispatch }, book) {
      bookService
        .createBook(book)
        .then(() => {
          toast("Libro guardado exitosamente", {
            theme: "dark",
            type: "success",
            dangerouslyHTMLString: true,
          });
          dispatch("fetchBooks");
        })
        .catch((error) =>
          toast("Error al guardar libro", {
            theme: "dark",
            type: "error",
            dangerouslyHTMLString: true,
          })
        );
    },
    updateBook({ dispatch }, { id, book }) {
      bookService
        .updateBook(id, book)
        .then(() => {
          toast("Libro editado exitosamente", {
            theme: "dark",
            type: "success",
            dangerouslyHTMLString: true,
          });
          dispatch("fetchBooks");
        })
        .catch((error) =>
          toast("Error al actualizar libro", {
            theme: "dark",
            type: "error",
            dangerouslyHTMLString: true,
          })
        );
    },
    deleteBook({ dispatch }, id) {
      bookService
        .deleteBook(id)
        .then(() => {
          toast("Libro eliminado exitosamente", {
            theme: "dark",
            type: "success",
            dangerouslyHTMLString: true,
          });
          dispatch("fetchBooks");
        })
        .catch((error) =>
          toast("Error al eliminar libro", {
            theme: "dark",
            type: "error",
            dangerouslyHTMLString: true,
          })
        );
    },
  },
  getters: {
    allBooks: (state) => state.books,
    currentBook: (state) => state.book,
  },
};
