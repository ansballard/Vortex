import { loadCategories, updateCategories } from './actions/category';
import { setTreeDataObject } from './actions/session';
import { categoryReducer } from './reducers/category';
import { sessionReducer } from './reducers/session';
import { ICategory } from './types/ICategory';
import { IGameListEntry } from './types/IGameListEntry';
import CategoryList from './views/CategoryList';

import { IExtensionContext } from '../../types/IExtensionContext';
import { log } from '../../util/log';
import { showError } from '../../util/message';

interface IGameInfo extends IGameListEntry {
  categories: ICategory[];
}

function init(context: IExtensionContext): boolean {
  context.registerMainPage('book', 'Categories', CategoryList, {
    hotkey: 'C',
  });

  context.registerReducer(['persistent', 'categories'], categoryReducer);
  context.registerReducer(['session', 'categories'], sessionReducer);

  context.once(() => {
    const store: Redux.Store<any> = context.api.store;

    try {

      context.api.events.on('retrieve-categories', (result) => {
        let isUpdate = result[2];
        let categories = result[1];
        let gameId = result[0];

        if (isUpdate) {
          context.api.store.dispatch(updateCategories(gameId, categories));
          store.dispatch(setTreeDataObject(categories));
        } else {
          context.api.store.dispatch(loadCategories(gameId, categories));
        }
      });

      context.api.events.on('gamemode-activated', (gameMode: string) => {
        store.dispatch(setTreeDataObject(undefined));
        context.api.events.emit('retrieve-category-list', false, {});
      });

    } catch (err) {
      log('error', 'Failed to load categories', err);
      showError(store.dispatch, 'Failed to load categories', err);
    }
  });

  return true;
}

export default init;