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

    const data = dataSource;
    let favoriteBooks = [];
    let filters = [];

    function renderBooks(){

        for(let bookData in data.books){
            const bookObject = data.books[bookData];

            const ratingBgc = determineRatingBgc(bookObject.rating);
            bookObject.ratingBgc = ratingBgc;
            const ratingWidth = bookObject.rating * 10;
            bookObject.ratingWidth = ratingWidth;

            const generatedHTML = templates.booksList(bookObject);
            const domElement = utils.createDOMFromHTML(generatedHTML);  
            const bookListContainer = document.querySelector(select.containerOf.booksList);
            bookListContainer.appendChild(domElement);
        }
    }
    
    function initActions(){

        const booksList = document.querySelector(select.containerOf.booksList)

        booksList.addEventListener('dblclick', function(event){
            event.preventDefault();

            const clickedElement = event.target.offsetParent;
            const bookId = clickedElement.getAttribute('data-id');

            if(!favoriteBooks.includes(bookId)){
                clickedElement.classList.add(classNames.favorite);
                favoriteBooks.push(bookId);

            } else if(favoriteBooks.includes(bookId)) {
                clickedElement.classList.remove(classNames.favorite);                   
                favoriteBooks = favoriteBooks.filter(x => x !== bookId);   
            }                
        }); 

        const filtersForm = document.querySelector(select.containerOf.filter);

        filtersForm.addEventListener('click', function(event){
            const target = event.target;
        
            const formName = target.getAttribute('name');
            const formType = target.getAttribute('type');
            const formValue = target.getAttribute('value');

            if(formName == 'filter' || formType == 'checkbox'){ 

                const filterIndex = filters.indexOf(formValue);

                if(target.checked){
                    filters.push(formValue);
                } else {
                    filters.splice(filterIndex, 1);
                }

                filterBooks();

            };

        });

    }

    function filterBooks(){

        for(let book of data.books){
            const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
            let shouldBeHidden = false;

            for(let filter of filters){
            
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

    function determineRatingBgc(rating){
            
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
    

    renderBooks();
    initActions();

}

