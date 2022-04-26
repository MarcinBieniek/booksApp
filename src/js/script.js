{
    'use strict'

    // 1. References to elements and templates

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

    console.log(document.querySelector(select.templateOf.books))

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
    };
    
    // 2. Acces to data file

    const data = dataSource

    console.log('dataSource: ', data)

    // 3. Rendering product

    function renderBooks(){

    // 4. Loop - finding single books

        for(let bookData in data.books){

            const bookValueName = bookData;
            const bookObject = data.books[bookData];

            console.log(bookValueName, bookObject)

            // 5. Generating HTML code based on template and single book data

            const generatedHTML = templates.booksList(bookObject);

            console.log('generated HTML', generatedHTML)

            // 6. Creating DOM element

            const domElement = utils.createDOMFromHTML(generatedHTML);  
            
            console.log('domElement', domElement)

            // 7. Adding DOM element to list

            const bookListContainer = document.querySelector(select.containerOf.booksList);
            bookListContainer.appendChild(domElement);


        }



    }

    renderBooks();

    // 
    
    /*
    function renderBooks(){
        //const thisProduct = this;
  
        const dataBooks = dataSource.books;
        const generatedHTML = templates.booksList(dataBooks);
        const htmlElement = utils.createDOMFromHTML(generatedHTML);
        const menuContainer = document.querySelector(select.containerOf.books);
        menuContainer.appendChild(htmlElement);
  
        console.log(dataSource.books)

      }

    function getElements(){
        

    }

    renderBooks()

   
    const templates = {
        menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),


    function getELements(){


    }
    */


}