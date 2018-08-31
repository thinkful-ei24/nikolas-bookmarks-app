'use-strict';

const store = (function(){

  

    const addItem = function(item) {
      // try {
      //   Item.validateName(name);
      //   this.items.push(Item.create(name));
      // } catch(e) {
      //   console.log(e.message);
      // }
      this.storedBookMarks.push(item);
    };
  
    const findById = function(id) {
      return this.items.find(item => item.id === id);
    };
  
    // const findAndToggleChecked = function(id) {
    //   const item = this.findById(id);
    //   item.checked = !item.checked;
    // };
  
    const findAndDelete = function(id) {
      this.storedBookMarks = this.storedBookMarks.filter(item => item.id !== id);
    };
  
    // const findAndUpdateName = function(id, name) {
    //   try {
    //     Item.validateName(name);
    //     const item = this.findById(id);
    //     item.name = name;
    //   } catch(e) {
    //     console.log('Cannot update name: ' + e.message);
    //   }
    // };
  
  
  
  
    return {
      storedBookMarks: [],
      filter: 0,
  
      addItem,
      findById,
      findAndDelete,
    };
    
  }());
  