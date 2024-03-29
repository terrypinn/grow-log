export const PLANT_TYPE = {
  Autoflower: 'Autoflower',
  Regular: 'Regular'
};

export const PLANT_PROPAGATION = {
  Seed: 'Seed',
  Clone: 'Clone'
};

export const PLANT_LOCATION = {
  Indoor: 'Indoor',
  Outdoor: 'Outdoor',
  Greenhouse: 'Greenhouse'
};

export const PLANT_METHOD = {
  Soil: 'Soil',
  Hydroponics: 'Hydroponics',
  Aquaponics: 'Aquaponics',
  Aeroponics: 'Aeroponics'
};

export const LOG_TYPE = {
  Action: 'Action',
  Expense: 'Expense',
  Insects: 'Insects',
  Issues: 'Issues',
  Nutrients: 'Nutrients',
  Observation: 'Observation',
  Training: 'Training',
  Used: 'Used',
  Watering: 'Watering'
};

export const LOG_TYPE_OPTIONS = {
  [LOG_TYPE.Insects]: ['Good', 'Bad'],
  [LOG_TYPE.Training]: ['Defoliation', 'HST', 'LST'],
  [LOG_TYPE.Watering]: ['RO', 'Rain', 'Spring', 'Tap']
};

export const PLANT_STAGE = {
  Seed: 'Seed',
  Germination: 'Germination',
  Seedling: 'Seedling',
  Vegging: 'Vegging',
  Flowering: 'Flowering',
  Drying: 'Drying',
  Curing: 'Curing',
  Archive: 'Archive'
};

export const FORM_ACTION = {
  add: 'add',
  edit: 'edit'
};
