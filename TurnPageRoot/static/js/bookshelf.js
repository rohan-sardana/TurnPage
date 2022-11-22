console.log('bookshelf.js loaded');

function loadDescriptionOfFirstBook() {
    try {
        let description = $('#book-on-shelf:nth-child(3)').attr("data-book-description");
        $('.on-first-load').append('<p>' + description + '</p>');
        description = $('#book-on-saved-shelf:nth-child(3)').attr("data-book-description");
        $('.on-first-load-saved-book').append('<p>' + description + '</p>');
    } catch (err) {
        console.log(err + " - Error with loading initial description. See javascript.");
    }
}

loadDescriptionOfFirstBook();

let currentBook = null; // TODO make this work with default book
let previousBook = null;
// FIRST BOOKSHELF
$('.my-bookshelf').flipster(
    {
        style: 'coverflow',
        start: 2,
        pauseOnHover: true,
        touch: true,
        buttons: true,
        fadeIn: 300,
        scrollwheel: false,
        // nav: 'after',
        onItemSwitch: function (currentItem, previousItem) {
            currentBook = currentItem;
            previousBook = previousItem;
            $(currentItem).addClass('active');
            $(previousItem).removeClass('active');
            $('.description-of-book').empty()
            let description = $('.active').attr("data-book-description");
            if (description !== undefined || description !== "" || description === null || description.empty()) {
                //TODO - Add a default description if the book has no description.
                $('.description-of-book').append('<p>' + description + '</p>');
            } else {
                $('.description-of-book').append("<p>Sorry, no description available.</p>");
            }
        }
    }
);
// SECOND BOOKSHELF
$('.saved-bookshelf').flipster(
    {
        style: 'coverflow',
        start: 2,
        pauseOnHover: true,
        touch: true,
        buttons: true,
        fadeIn: 300,
        scrollwheel: false,
        // nav: 'after',
        onItemSwitch: function (currentItem, previousItem) {
            $(currentItem).addClass('active');
            $(previousItem).removeClass('active');
            $('.description-of-saved-book').empty()
            let description = $('.active').attr("data-book-description");
            $('.description-of-saved-book').append('<p>' + description + '</p>');


        }
    }
);

// MOVING BOOKS BETWEEN BOOKSHELVES
const moveToSavedBooksUrl = '/bookshelf/move_to_saved_books';
const moveToLikedBooksUrl = '/bookshelf/move_to_liked_books';
const deleteBookUrl = '/bookshelf/delete_book';


try {
    csrftoken = Cookies.get('csrftoken');
} catch (e) {
    console.warn(e + " - Error with getting csrftoken. See javascript.");
}


$('#move-to-saved-books-btn').click(function () {
    let bookId = $(currentBook).attr("data-book-id");
    $.ajax({
        url: moveToSavedBooksUrl,
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'book_id': bookId
        },
        success: function (data) {
            console.log(data + " Successful move to saved books.");
        },
        error: function (data) {
            console.log(data + " Error with moving book to saved books.");
        }
    })
});