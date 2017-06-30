import HighlightButton from './views/HighlightButton';
import TextareaNotes from './views/TextareaNotes';

import { selectors, types, util } from 'nmm-api';
import * as React from 'react';

function init(context: types.IExtensionContext) {

  context.registerTableAttribute('mods', {
    id: 'notes',
    description: 'Mod Notes',
    icon: 'sticky-note',
    placement: 'detail',
    customRenderer: (mod, detailCell, t) => {
      const gameMode = selectors.activeGameId(context.api.store.getState());
      return (<TextareaNotes gameMode={gameMode} mod={mod} />);
    },
    calc: (mod) => util.getSafe(mod.attributes, ['notes'], ''),
    isToggleable: false,
    edit: {},
    isSortable: false,
  });

  context.registerTableAttribute('mods', {
    id: 'modHighlight',
    name: 'Highlight',
    description: 'Mod Highlight',
    icon: 'lightbulb-o',
    placement: 'table',
    customRenderer: (mod, detailCell, t) => {
      const gameMode = selectors.activeGameId(context.api.store.getState());
      return (<HighlightButton gameMode={gameMode} mod={mod} />);
    },
    calc: (mod) => util.getSafe(mod.attributes, ['icon'], ''),
    isToggleable: true,
    edit: {},
    isSortable: true,
    isDefaultVisible: false,
  });

  return true;
}

export default init;