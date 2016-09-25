(function () {
'use strict';

// ###########   Application declaration   ###########
// ###################################################

angular.module('ShoppingListCheckOff', [])
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.controller('ToBuyShoppingController', ToBuyShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// ###########   Injectors   ###########
// #####################################

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];


// ###########   Controllers   ###########
// #######################################

function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
  var boughtList       = this;
  boughtList.itemList  = ShoppingListCheckOffService.getBoughtList();

  boughtList.isEmpty   = isBoughtListEmpty;

  function isBoughtListEmpty() {
    return ShoppingListCheckOffService.isBoughtListEmpty();
  }  

};

function ToBuyShoppingController (ShoppingListCheckOffService) {
  var toBuyList       = this;
  toBuyList.itemList  = ShoppingListCheckOffService.getToBuyList();

  // Delagators
  toBuyList.isEmpty   = ShoppingListCheckOffService.isToBuyListEmpty;
  toBuyList.bought    = ShoppingListCheckOffService.bought;

};

// ###########   Services   ###########
// ####################################

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var boughtItems = [];
  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "sugar drinks", quantity: 6 },
    { name: "ice cream", quantity: 5 },
    { name: "doritos", quantity: 3 },
    { name: "pop corn", quantity: 4 },
    { name: "cup cakes", quantity: 12 },
    { name: "cotton candy", quantity: 6 }];

  // Public declarations
  service.bought             = bought;
  service.isToBuyListEmpty   = isToBuyListEmpty;
  service.isBoughtListEmpty  = isBoughtListEmpty;
  service.getToBuyList       = getToBuyList;
  service.getBoughtList      = getBoughtList;

  // Methods

  function bought(itemIndex) {
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  function isBoughtListEmpty() {
    return boughtItems.length === 0;
  }

  function isToBuyListEmpty() {
    return toBuyItems.length === 0;
  }

  function getToBuyList() {
    return toBuyItems;
  }

  function getBoughtList() {
    return boughtItems;
  }

}

})();
