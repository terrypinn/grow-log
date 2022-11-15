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
  BadInsects: 'BadInsects',
  GoodInsects: 'GoodInsects',
  Issues: 'Issues',
  Nutrients: 'Nutrients',
  Observation: 'Observation',
  PottingUp: 'PottingUp',
  Training: 'Training',
  Watering: 'Watering'
};

export const LOG_TYPE_OPTIONS = {
  [LOG_TYPE.Training]: {
    Defoliation: 'Defoliation',
    HighStressTraining: 'HST',
    LowStressTraining: 'LST'
  },
  [LOG_TYPE.Watering]: {
    ReverseOsmosis: 'RO',
    Rain: 'Rain',
    Spring: 'Spring',
    Tap: 'Tap'
  }
};