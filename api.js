'use strict';

const api = (function() {
  let BASE_URL = 'https://thinkful-list-api.herokuapp.com';
  let MY_URL = BASE_URL + '/nikolas/bookmarks';

  const getItems = function (callback){
    $.getJSON(`${MY_URL}`, (response) => {
      callback(response);
    });
  };

  const createItem = function (obj, callback) {
    $.ajax({
      url: `${MY_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      success: function(data) {
        callback(data);
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

  return {
    getItems,
    createItem,
    deleteItem
  };
}());