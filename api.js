'use strict';

const api = (function() {
  let BASE_URL = 'https://thinkful-list-api.herokuapp.com';
  let MY_URL = BASE_URL + '/nikolas/bookmarks';

  const getItems = function (callback){
    $.getJSON(`${MY_URL}`, (response) => {
      callback(response);
    });
  };

  const createItem = function (obj, callback, callback2) {
    $.ajax({
      url: `${MY_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      success: function(data) {
        callback(data);
      },
      error: function(data) {
        callback2(data);
      }
    });
  };

  const deleteItem = function (id, callback) {
    $.ajax({
      url: `${MY_URL}/${id}`,
      method: 'DELETE',
      success: function(data) {
        callback(data);
      }
    });
  };

  const updateItem = function (id, updateData, callback, callback2) {
    $.ajax({
      url: `${MY_URL}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: function(data) {
        callback(data);  //on success run a function with the successful message 
      },
      error: function(data) {
        callback2(data);
      }
    });
  };

  return {
    updateItem,
    getItems,
    createItem,
    deleteItem
  };
}());