'use strict';
const bookmark = (function () {

  let storedBookMarks = [];
  let filter = 0;

  const render = function () {
    let items = storedBookMarks;
    if(filter === 2) {
        items = items.filter(obj => obj.rateValue > 1);
    }
    if(filter === 3) {
      items = items.filter(obj => obj.rateValue > 2);
    } 
    if(filter === 4) {
      items = items.filter(obj => obj.rateValue > 3);
    }
    if(filter === 5) {
      items = items.filter(obj => obj.rateValue > 4);
    }
    
    console.log(items);
    
    let joinedHtmlBookmarks = items.map(obj => generateBookMarkHtml(obj));
    $('.all-book-marks-go-here').html(joinedHtmlBookmarks);
   
  };




  const generateBookMarkHtml = function (obj) {
    let starHTML = `<div class="star-container">
   <div class="fa fa-star checked"></div>
   <div class="fa fa-star checked"></div>
   <div class="fa fa-star checked"></div>
   <div class="fa fa-star "></div>
   <div class="fa fa-star "></div>`;

    if (obj.rateValue === 5) {
      starHTML = `<div class="star-container">
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>`;
    }

    if (obj.rateValue === 4) {
      starHTML = `
    <div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>`;
    }
    if (obj.rateValue === 3) {
      starHTML = `
    <div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>`;
    }

    if (obj.rateValue === 2) {
      starHTML = `
    <div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>`;
    }

    if (obj.rateValue === 1) {
      starHTML = `<div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>`;
    }

    if (obj.expanded === true) {
      return `<ul class="container-for-bookmarks" data-item-id="${obj.id}">   
    <li class="bookmark-title">${obj.titleValue}</li>
    <div class="star-container">
    ${starHTML}  
      <div class="expanded-space">
          <div><div class="bookmark-details">
          <div class="bookmark-paragraph">
            <div>
             ${obj.descriptionValue}
            </div>
          </div>
            <div class="link-delete-container">
                <a href="${obj.urlValue}">${obj.urlValue}</a>
                <button class="delete-button">DELETE</button>
            </div>
        </div></div>
        <button class="more-info-bttn">Less Info!</button>
      </div>  
    </ul>
    </div>`;
    }


    if (!obj.expanded) {
      return `<ul class="container-for-bookmarks" data-item-id="${obj.id}">   
          <li class="bookmark-title">${obj.titleValue}</li>
          <div class="star-container">
          ${starHTML}
          
            <div class="expanded-space">
                <div></div>
              <button class="more-info-bttn">More Info!</button>
            </div>  
          </ul>
          </div>`;
    }
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
      let rateValue = parseInt($(this).find('#rating').val());

      storedBookMarks.push({
        titleValue,
        urlValue,
        descriptionValue,
        rateValue,
        expanded: false,
        id: Math.floor(Math.random() * 9999999)
      });
      console.log(storedBookMarks);
      $('.js-form-add-div').html(renderNoFormHtml());
     

      render();
      
    });
  };

  const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.container-for-bookmarks')
      .data('item-id');
  };

  const findById = function (id) {
    let object = storedBookMarks.find(obj => obj.id === id);
    return object;
  };

  const handleInfoButtonClick = function () {
    $('.all-book-marks-go-here').on('click', '.more-info-bttn', function (event) {
      let thisItemID = getItemIdFromElement(event.currentTarget);
      
      let obj = findById(thisItemID);
      obj.expanded = !obj.expanded;
      render();
    });
  };

  const handleDropDownChange = function () {
    $('.change').on('click', function (event) {
      event.preventDefault();
     
      let parsedInt = parseInt($('.drop-down-button').val());
      filter = parsedInt;
      render();
    });
  };


  const handleClicks = function () {
    handleAddFormHtmlOnClick();
    handleDropDownChange();
    handleBookMarkSubmit();
    handleInfoButtonClick();
    handleDeleteBookmark();
  };

  const handleDeleteBookmark = function () {
    $('.delete-button').on('click', function () {
      let thisBookmark = $(this).closest('.container-for-bookmarks');
      thisBookmark.remove();
    });
  };


  return {
    filter,
    handleDropDownChange,
    render,
    handleClicks,
    // handleInfoButtonClick,
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

