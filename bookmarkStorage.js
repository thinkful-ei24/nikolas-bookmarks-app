'use strict';
const bookmark = (function () {

  let storedBookMarks = [];
  let filter = 0;

  const render = function () {
    let items = storedBookMarks;
    if(filter === 2) {
      items = items.filter(obj => obj.rating > 1);
    }
    if(filter === 3) {
      items = items.filter(obj => obj.rating > 2);
    } 
    if(filter === 4) {
      items = items.filter(obj => obj.rating > 3);
    }
    if(filter === 5) {
      items = items.filter(obj => obj.rating > 4);
    }
    
    console.log(items);
    
    let joinedHtmlBookmarks = items.map(obj => generateBookMarkHtml(obj));
    $('.all-book-marks-go-here').html(joinedHtmlBookmarks);
   
  };
  
  const addItem = function (item) {
    storedBookMarks.push(item);
  };  //move

  const findAndDelete = function(id) {
      storedBookMarks = storedBookMarks.filter(item => item.id != id);
  }  //move


  const generateBookMarkHtml = function (obj) {
    let starHTML = `<div class="star-container">
   <div class="fa fa-star checked"></div>
   <div class="fa fa-star checked"></div>
   <div class="fa fa-star checked"></div>
   <div class="fa fa-star "></div>
   <div class="fa fa-star "></div>`;

    if (obj.rating=== 5) {
      starHTML = `<div class="star-container">
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>
       <div class="fa fa-star checked"></div>`;
    }

    if (obj.rating === 4) {
      starHTML = `
    <div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>`;
    }
    if (obj.rating=== 3) {
      starHTML = `
    <div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>`;
    }

    if (obj.rating === 2) {
      starHTML = `
    <div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>`;
    }

    if (obj.rating === 1) {
      starHTML = `<div class="star-container">
    <div class="fa fa-star checked"></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>
    <div class="fa fa-star "></div>`;
    }

    if (obj.expanded === true) {
      return `<ul class="container-for-bookmarks" data-item-id="${obj.id}">   
    <li class="bookmark-title">${obj.title}</li>
    <div class="star-container">
    ${starHTML}  
      <div class="expanded-space">
          <div><div class="bookmark-details">
          <div class="bookmark-paragraph">
            <div>
             ${obj.desc}
            </div>
          </div>
            <div class="link-delete-container">
                <a href="${obj.url}">${obj.url}</a>
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
          <li class="bookmark-title">${obj.title}</li>
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
      let title = $(this).find('#title').val();
      let url= $(this).find('#url').val();
      let desc = $(this).find('#description').val();
      let rating = parseInt($(this).find('#rating').val());

      let newObj = {
        title,
        url,
        desc,
        rating,
        expanded: false,
      };
      api.createItem(newObj, (newObj) => {
        addItem(newObj);
        render();
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

  
  const handleDeleteBookmark = function () {
    $('.all-book-marks-go-here').on('click', '.delete-button', function () {
      let thisBookmark = $(this).closest('.container-for-bookmarks');
      let elementId = getItemIdFromElement(thisBookmark);
      api.deleteItem(elementId, () => {
        findAndDelete(elementId);
        render();
      });
     
    });
  };

  const handleClicks = function () {
    handleAddFormHtmlOnClick();
    handleDropDownChange();
    handleBookMarkSubmit();
    handleInfoButtonClick();
    handleDeleteBookmark();
  };

 


  return {
    filter,
    handleDropDownChange,
    render,
    handleClicks,
    addItem,
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

