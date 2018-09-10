import { Request, Response, NextFunction } from 'express';
import expressRouter from 'express-promise-router';

const router = expressRouter();

import ItemHandler from '../services/ItemHandler';

const itemHandler = new ItemHandler();

import ProductHandler from '../services/ProductHandler';

const productHandler = ProductHandler();

import DetailsError from '../DetailsError';

/**
 * Return the item page.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function getItemList(req: Request, res: Response, next: NextFunction) {
  if (req.accepts('application/json')) {
    return res.json({ ok: true, result: itemHandler.getList() });
  }

  return next();
}

/**
 * Return the item list.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function shoopingListView(req: Request, res: Response, next: NextFunction) {
  if (req.accepts('text/html')) {
    return res.render('index', {
      message: 'Shopping List',
      products: productHandler.getProductList(),
      listOfItems: itemHandler.getList(),
    });
  }

  return next();
}

/**
 * Return the details of an item by the given id.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function getItemById(req: Request, res: Response, next: NextFunction) {
  const item = itemHandler.findItemById(req.params.id);

  if (item) return res.json({ result: item });

  const error = new DetailsError(
    'ERROR_ITEM_NOT_FOUND', 
    404,
    'The item has not been found in your shopping list.',
    `Item ${req.params.id} has not found.`);

  return next(error);
}

/**
 * @memberof Router.item
 * Ccreates and adds a new item with the given data into the shopping list.
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function createNewItem(req: Request, res: Response) {
  const product = productHandler.findProductById(req.body.selectedProduct);
  itemHandler.createNewItem(product, req.body);
  res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
}

/**
 * Updates the page with the modified item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function updateItem(req: Request, res: Response, next: NextFunction) {
  const item = itemHandler.findItemById(req.params.id);

  if (item) {
    itemHandler.modifyItem(req.params.id, req.body.unityItem, req.body.quantityItem);

    return res.render('index', {
      message: 'Shopping List',
      products: productHandler.getProductList(),
      listOfItems: itemHandler.getList(),
    });
  }

  const error = new DetailsError(
    'ERROR_ITEM_NOT_FOUND', 
    404,
    'The item has not been found in your shopping list.',
    `Item ${req.params.id} has not found.`);

  return next(error);
}

/**
 * Update the item page without the selected item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function removeItem(req: Request, res: Response, next: NextFunction) {
  const item = itemHandler.findItemById(req.params.id);

  if (item) {
    itemHandler.removeItemOfList(req.params.id);
    return res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
  }

  const error = new DetailsError(
    'ERROR_ITEM_NOT_FOUND', 
    404,
    'The item has not been found in your shopping list.',
    `Item ${req.params.id} has not found.`);

  return next(error);
}

router.get('/', shoopingListView, getItemList);
router.get('/:id', getItemById);
router.post('/', createNewItem);
router.put('/:id', updateItem);
router.delete('/:id', removeItem);

/**
 * @namespace Router.item
 */
export = router;
