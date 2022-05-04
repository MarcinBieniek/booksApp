/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    'use strict'

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
        favorite: 'favorite',
        hidden: 'hidden',
    }

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
    };

    class BooksList {
        constructor(){
            const thisBooksList = this;

            thisBooksList.initData();
            thisBooksList.getElements();
            thisBooksList.renderBooks();
            thisBooksList.initActions();
        }

        initData(){
            const thisBooksList = this;
            
            this.data = dataSource.books;

            thisBooksList.favoriteBooks = [];
            thisBooksList.filters = [];
        }

        getElements(){
            const thisBooksList = this;
            
            thisBooksList.dom = {};

            thisBooksList.dom.booksList = document.querySelector(select.containerOf.booksList);
            thisBooksList.dom.filters = document.querySelector(select.containerOf.filter);
        }

        renderBooks(){
            const thisBooksList = this;

            for(let bookData in this.data){
                const bookObject = this.data[bookData];

                const ratingBgc = thisBooksList.determineRatingBgc(bookObject.rating);
                bookObject.ratingBgc = ratingBgc;
                const ratingWidth = bookObject.rating * 10;
                bookObject.ratingWidth = ratingWidth;

                const generatedHTML = templates.booksList(bookObject);
                const domElement = utils.createDOMFromHTML(generatedHTML);  
                const bookListContainer = thisBooksList.dom.booksList;
                
                bookListContainer.appendChild(domElement);
            }
        }

        filterBooks(){
            const thisBooksList = this;

            for(let book of this.data){
                const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
                let shouldBeHidden = false;

                for(let filter of thisBooksList.filters){
                
                    if(!book.details[filter]){
                    shouldBeHidden = true;
                    break;
                    }

                }

                if(!shouldBeHidden){
                    filteredBook.classList.remove(classNames.hidden);
                } else {
                    filteredBook.classList.add(classNames.hidden);
                }
                
            }

        }

        initActions(){
            const thisBooksList = this;

            thisBooksList.dom.booksList.addEventListener('dblclick', function(event){
                event.preventDefault();

                const clickedElement = event.target.offsetParent;
                const bookId = clickedElement.getAttribute('data-id');

                if(!thisBooksList.favoriteBooks.includes(bookId)){
                    clickedElement.classList.add(classNames.favorite);
                    thisBooksList.favoriteBooks.push(bookId);

                } else if(thisBooksList.favoriteBooks.includes(bookId)) {
                    clickedElement.classList.remove(classNames.favorite);                   
                    thisBooksList.favoriteBooks = thisBooksList.favoriteBooks.filter(x => x !== bookId);   
                }                
            }); 

            //const filtersForm = document.querySelector(select.containerOf.filter);

            thisBooksList.dom.filters.addEventListener('click', function(event){
                const target = event.target;
            
                const formName = target.getAttribute('name');
                const formType = target.getAttribute('type');
                const formValue = target.getAttribute('value');

                if(formName == 'filter' || formType == 'checkbox'){ 

                    const filterIndex = thisBooksList.filters.indexOf(formValue);

                    if(target.checked){
                        thisBooksList.filters.push(formValue);
                    } else {
                        thisBooksList.filters.splice(filterIndex, 1);
                    }

                    thisBooksList.filterBooks();

                };

            });

        }

        determineRatingBgc(rating){
                
            let ratingGradient = '';

            if(rating < 6){
                    ratingGradient = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
                }else if(rating > 6 && rating <= 8){
                    ratingGradient = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
                }else if(rating > 8 && rating <= 9){
                    ratingGradient = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
                }else if(rating > 9){
                    ratingGradient = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
                }
                return ratingGradient;

        }

    }
    
new BooksList();

}

