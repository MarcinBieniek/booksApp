{
    'use strict'
    // [Excercise 1]
    // 1. Create references to elements and templates

    const select = {
        templateOf: {
            books: '#template-book',
        },
        containerOf: {
            filter: '.filters',
            booksPanel: '.books-panel',
            booksList: '.books-list',
        },
        product: {
            header: '.book__header',
            name: '.book__name',
            price: '.product__base-price',
            imageWrapper: 'book__image',
            bookRatingWrapper: '.book__rating',
            bookRating: '.book__rating__fill',
        },
    }

    const classNames = {
        favourite: 'favorite',
    }

    console.log(document.querySelector(select.templateOf.books))

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
    };
    
    // 2. Acces to data file

    const data = dataSource

    // 3. Function rendering books

    function renderBooks(){

    // 4. Loop - finding single books data

        for(let bookData in data.books){

            const bookValueName = bookData;
            const bookObject = data.books[bookData];

            // 5. Generating HTML code based on template and single book data

            const generatedHTML = templates.booksList(bookObject);

            console.log('generated HTML', generatedHTML)

            // 6. Creating DOM element

            const domElement = utils.createDOMFromHTML(generatedHTML);  

            // 7. Adding DOM element to list

            const bookListContainer = document.querySelector(select.containerOf.booksList);
            bookListContainer.appendChild(domElement);

        }
    }

    // [Excercise 2 - steps 8-14]
    // [Excercise 3 - steps 15-]
    // 8. Create empty array

    const favoriteBooks = [];

    // 9. Add initActions function
    
    function initActions(){

        // 10. Prepare reference to all .book__image elements 

        const images = document.querySelectorAll('.book__image');

        console.log('images:', images)

        // 11. Go through each element

        for(const image of images){    

            // 12. Add event listener with function (preventDefault, add class, get Id, add id to array)

            image.addEventListener('dblclick', function(event){
                event.preventDefault();
                event.stopPropagation();
                image.classList.add(classNames.favourite);

                // 13. Get book identification from data-id attribute

                const bookId = event.target.parentElement.parentElement.getAttribute('data-id');

                // 14. Add bookId to array

                favoriteBooks.push(bookId);

                console.log(favoriteBooks)

            });
        }
    }

    renderBooks();
    initActions();

}