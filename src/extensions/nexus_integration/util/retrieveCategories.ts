
import { log } from '../../../util/log';

import { ICategoryDictionary } from '../../category_management/types/IcategoryDictionary';

import Nexus, {ICategory} from 'nexus-api';

interface IGameInfo {
  categories: ICategory[];
}

/**
 * retrieve the categories by the server call
 * 
 * @param {string} activeGameId
 * @param {Nexus} nexus
 * @return {ICategoryDictionary} res 
 * 
 */

function retrieveCategoryList(
  activeGameId: string,
  nexus: Nexus
): Promise<ICategoryDictionary> {
  return new Promise<ICategoryDictionary>((resolve, reject) => {
    nexus.getGameInfo(activeGameId)
      .then((gameInfo: IGameInfo) => {
        if (gameInfo.categories !== undefined) {
          let res: ICategoryDictionary = {};
          let counter: number = 1;

          gameInfo.categories.forEach((category: ICategory) => {
            let parent = category.parent_category === false
              ? undefined
              : category.parent_category.toString();

            res[category.category_id.toString()] = {
              name: category.name,
              parentCategory: parent,
              order: counter,
            };
            counter++;
          });

          resolve(res);
        }
      }
      )
      .catch((err) => {
        log('error', 'An error occurred retrieving the Game Info', { err: err.message });
        reject(err);
      });
  });
}

export default retrieveCategoryList;
