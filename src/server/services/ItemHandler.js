
const Item = require('../../model/Item');
// TODO: The list must be persisted in a DB, no in memory
/**
 * @class
 */
class ItemHandler {
  constructor() {
    // TODO: Remove once the list is in the DB
    this.list = [];
  }

  /**
   * Return items list of the current user.
   * @function
   * @returns {Array[Item]} Array of items.
   */
  getList() {
    return [...this.list];
  }

  /**
   * Return an item by id inside the items list of the current user.
   * @function
   * @param {String} idItem
   * @returns {Item} Item object
   */
  findItemById(idItem) {
    const detailsItem = this.list.find(item => item.id === idItem);

    return detailsItem;
  }

  // TODO: The creation of the item should not require the id, because that is generated by the DB
  /**
   * Create a new item with the specified data and add it to the items list of the current user.
   * @function
   * @param {Product} product
   * @param {JSON} itemData
   * @returns {Item} New Item object
   */
  createNewItem(product, itemData) {
    const unity = itemData.unityItem;
    const quantity = itemData.quantityItem;
    const id = Math.random().toString(36).substring(2, 5);

    const newItem = new Item(id, product, Date(), unity, quantity, true);

    this.list.push(newItem);
    return newItem;
  }

  /**
   * Modify an existing item with the new data in the items list of the current user.
   * @function
   * @param {String} itemId
   * @param {Unity} newUnityItem
   * @param {Number} newQuantityItem
   */
  modifyItem(itemId, newUnityItem, newQuantityItem) {
    const indexModifiedItem = this.list.findIndex(previousItem => previousItem.id === itemId);
    this.list[indexModifiedItem].unity = newUnityItem;
    this.list[indexModifiedItem].quantity = newQuantityItem;
  }

  /**
   * Remove an existing item by ID of the items list of the current user.
   * @function
   * @param {String} id
   */
  removeItemOfList(id) {
    const filterList = this.list.filter(item => item.id !== id);
    this.list = filterList;
  }
}

module.exports = ItemHandler;
