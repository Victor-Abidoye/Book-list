// BOOK class: Represents a BOOK
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handles UI Tasks
class UIdisplay {
    // Add to UI
    static displayBook () {
        const storedBooks = Store.getBooks()
        storedBooks.forEach((book) => {
           UIdisplay.addToLIst(book)
        })
    }

    static addToLIst (book) {
        const list = document.querySelector('#myList')

        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><i class="far fa-trash-alt delete"></i></td>
        `
        list.appendChild(tr)
    }

    static deleteBook (el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static alertMessage (message, color) {
        const div = document.createElement('div')
        div.appendChild(document.createTextNode(message))
        div.style.backgroundColor = color
        const container = document.querySelector('.inner')
        const before = document.querySelector('.myForm')
        container.insertBefore(div, before)
        setTimeout(() => {
            div.remove()
        }, 2000)
    }

    static clearUI () {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks () {
        let Books
        if (JSON.parse(localStorage.getItem('books')) == null) {
            Books = []
        } else {
            Books = JSON.parse(localStorage.getItem('books'))
        }
        return Books
    }

    static addBooks (book) {
        const Books = Store.getBooks()
        Books.push(book)
        localStorage.setItem('books', JSON.stringify(Books))
    }

    static removeBooks (isbn) {
        const Books = Store.getBooks()
        Books.forEach((book, index) => {
            if (book.isbn == isbn) {
                Books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(Books))
    }
}
document.addEventListener('DOMContentLoaded', UIdisplay.displayBook)

// Event: Adds a Book
document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    if (title == '' || author == '' || isbn == '') {
        UIdisplay.alertMessage('Please fill in all fields', '#d9534f')
    } else {
        const newBook = new Book(title, author, isbn)

        //Add to localStorage
        Store.addBooks(newBook)

        // Add list to ui
        UIdisplay.addToLIst(newBook)

        //ALert message for succesful alert
        UIdisplay.alertMessage('Book Added', '#5cb85c')

        // clear output
        UIdisplay.clearUI()
    }
})

// Event: Remove a Book
document.querySelector('#myList').addEventListener('click', (e) => {
    // Remove UI book
    UIdisplay.deleteBook(e.target)

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)

    UIdisplay.alertMessage('Book removed', '#5cb85c')
})