

// function serializeJson(form) {
//     const formData = new FormData(form);
//     const o = {};
//     formData.forEach((val, name) => o[name] = val)
//     return JSON.stringify(o);
// }

// $.fn.extend({
//     serializeJson: function() {
//         const formData = new FormData(this[0]);
//         const o = {};
//         formData.forEach
//     }
// })

// $(function() {
    
// });

console.log('hello');


$(function () {
    
    bookmark.handleClicks();
    bookmark.render();
    api.getItems((items) => {
       items.forEach(item => store.addItem(item));
       bookmark.render();
    });
  });