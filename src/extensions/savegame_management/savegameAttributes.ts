import { ISavegameAttribute } from './types/ISavegameAttribute';

export const SAVEGAME_ID: ISavegameAttribute = {
  id: 'id',
  name: 'Savegame id',
  description: 'Id of the savegame',
  icon: 'quote-left',
  calc: (attributes) => attributes.id,
  isDetail: false,
  isToggleable: false,
  isReadOnly: true,
};

export const SAVEGAME_NAME: ISavegameAttribute = {
  id: 'name',
  name: 'Savegame name',
  description: 'Name of the savegame',
  icon: 'quote-left',
  calc: (attributes) => attributes.name,
  isDetail: false,
  isToggleable: true,
  isReadOnly: true,
  sortFunc: (lhs: string, rhs: string, locale: string): number => {
    return lhs.localeCompare(rhs, locale, { sensitivity: 'base' });
  },
};

export const LOCATION: ISavegameAttribute = {
  id: 'location',
  name: 'Ingame location',
  description: 'Location during the save',
  icon: 'map-marker',
  calc: (attributes) => attributes.location,
  isDetail: false,
  isToggleable: false,
  isReadOnly: true,
};

export const LEVEL: ISavegameAttribute = {
  id: 'level',
  name: 'Character level',
  description: 'Level of the character',
  icon: 'fa.user-circle',
  calc: (attributes) => attributes.level,
  isDetail: false,
  isToggleable: false,
  isReadOnly: true,
};

export const CREATION_TIME: ISavegameAttribute = {
  id: 'creationtime',
  name: 'Creation Time',
  description: 'File creation time',
  icon: ' calendar-plus-o',
  calc: (attributes) => new Date(attributes.creationtime),
  isDetail: false,
  isToggleable: true,
  isReadOnly: true,
};

export const SCREENSHOT: ISavegameAttribute = {
  id: 'screenshot',
  name: 'Screenshot',
  description: 'Savegame screenshot',
  icon: ' file-picture-o',
  calc: (attributes) => attributes.screenshot,
  isDetail: true,
  isToggleable: true,
  isReadOnly: true,
};

export const PLUGINS: ISavegameAttribute = {
  id: 'plugins',
  name: 'Plugins',
  description: 'Savegame plugins',
  icon: ' file-picture-o',
  calc: (attributes) => attributes.plugins,
  isDetail: true,
  isToggleable: true,
  isReadOnly: true,
};