'use strict';
const bookmark = (function () {
  
  let storedBookMarks = [];


  const render = function () {
      storedBookMarks.forEach(obj => console.log(obj));
  }

  const generateBookMarkHtml = function () {
    return `<ul class="container-for-bookmarks">   
          <li class="bookmark-title"></li>
          <div class="star-container">
          <div class="fa fa-star checked"></div>
          <div class="fa fa-star checked"></div>
          <div class="fa fa-star checked"></div>
          <div class="fa fa-star "></div>
          <div class="fa fa-star "></div>
          
            <div class="expanded-space">
                <div>gwllo</div>
              <button class="more-info-bttn">More Info!</button>
            </div>  
          </ul>
          </div>`;
  };

  const generateFormHtml = function () {
    return ` <form class="form-style-4" action="" method="post">
      <label for="field1">
      <span>Enter Book Name</span><input type="text" name="title" id="title" required="true" />
      </label>
      <label for="field2">
      <span>Enter URL</span><input type="text" name="url"  id="url" required="true" />
      </label>
      <label for="field3">
      <span>Enter Description</span><input type="text" name="description" id="description" required="true" />                        </label>
      <label for="field4">
      <span>Rate Out of 5!</span><textarea name="rating" id="rating" onkeyup="adjust_textarea(this)" required="true"></textarea>
      </label>
      <label>
      <span>&nbsp;</span><input type="submit" class="submit-form" value="Send Letter" />
      </label>
     </form>`;
  };

  const renderNoFormHtml = function () {
    return `<div class="form-add-div js-form-add-div">
                 </div>`;
  };



  const renderExpandedHtml = function () {
    return `<div class="bookmark-details">
         <div class="bookmark-paragraph">
           <div>
           </div>
         </div>
           <div class="link-delete-container">
               <a href="google.com">hello</a>
               <button class="delete-button">DELETE</button>
           </div>
       </div>`;
  };

  const handleAddFormHtmlOnClick = function () {
    $('.add-new-button').on('click', function () {
      $('.js-form-add-div').html(generateFormHtml());
      
    });
  };

  const handleBookMarkSubmit = function () {
    $('.js-form-add-div').submit(function (event) {
      event.preventDefault();
      let titleValue = $(this).find('#title').val();
      let urlValue = $(this).find('#url').val();
      let descriptionValue = $(this).find('#description').val();
      let rateValue = $(this).find('#rating').val();
      $('.js-form-add-div').html(renderNoFormHtml());
      $('.all-book-marks-go-here').html(generateBookMarkHtml());
      storedBookMarks.push({
          titleValue, 
          urlValue,
          descriptionValue,
          rateValue,
        });
    });
  };

  const handleInfoButtonClick = function () {
    $('.more-info-bttn').on('click', function (event) {
      let dog = $(this).closest('.expanded-space').find('div');
      dog.html(renderExpandedHtml);
     
    });
  };

  const handleClicks = function () {
    handleAddFormHtmlOnClick();
    handleBookMarkSubmit();
    handleInfoButtonClick();
    handleDeleteBookmark();
  };

  const handleDeleteBookmark = function () {
    $('.delete-button').on('click', function() {
      let thisBookmark = $(this).closest('.container-for-bookmarks');
      thisBookmark.remove();
      handleClicks();
    });
  };
  

  return {
    storedBookMarks,
    generateBookMarkHtml,
    generateFormHtml,
    renderNoFormHtml,
    handleAddFormHtmlOnClick,
    handleClicks,
    handleBookMarkSubmit,
    renderExpandedHtml,
    handleInfoButtonClick,
    handleDeleteBookmark
  };


}());





//  <form class="form-style-4" action="" method="post">
//  <label for="field1">
//  <span>Enter Book Name</span><input type="text" name="title" required="true" />
//  </label>
//  <label for="field2">
//  <span>Enter URL</span><input type="text" name="url" required="true" />
//  </label>
//  <label for="field3">
//  <span>Enter Description</span><input type="text" name="description" required="true" />                        </label>
//  <label for="field4">
//  <span>Rate Out of 5!</span><textarea name="rating" onkeyup="adjust_textarea(this)" required="true"></textarea>
//  </label>
//  <label>
//  <span>&nbsp;</span><input type="submit" value="Send Letter" />
//  </label>
// </form>




// REGULAR BOOKMARK






// BOOKMARK WITH DESCRIPTION

//  <ul class="container-for-bookmarks">     
//  <li class="bookmark-title">BookMark Title Here</li>
//  <div class="star-container">
//    <div class="fa fa-star checked"></div>
//    <div class="fa fa-star checked"></div>
//    <div class="fa fa-star checked"></div>
//    <div class="fa fa-star "></div>
//    <div class="fa fa-star "></div>
//  </div>
//  <button class="more-info-bttn">More Info!</button>
//  <div class="bookmark-details">
//    <div class="bookmark-paragraph">
//      <div>dafafffffffffffffffffffffffffffffffff
//          dafafffffffffffffffffffffffffffffffff
//          dafafffffffffffffffffffffffffffffffff
//          dafafffffffffffffffffffffffffffffffff
//      </div>
//    </div>
//      <div class="link-delete-container">
//          <a href="google.com">hello</a>
//          <button class="delete-button">DELETE</button>
//      </div>
//  </div>
// </ul> 

$(function () {
  bookmark.handleClicks();
});