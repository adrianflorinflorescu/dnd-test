import { createSlice, configureStore } from '@reduxjs/toolkit'
import { DataType, ITEM_TYPES, generateGroups, generateRVs } from './components/data-helpers';

export interface RootState {
  specialArray: DataType;
}

const initialState: DataType = [
  {
    type: ITEM_TYPES.UNASSIGNED,
    id: "UNASSIGNED",
    name: "UNASSIGNED",
    items: [
      ...generateRVs({ numberOfRvS: 2, prefix: "UNASSIGNED" }),
      ...generateGroups({
        numberOfGroups: 1,
        numberOfRvS: 2,
        prefix: "UNASSIGNED",
      }),
    ],
  },
  {
    type: ITEM_TYPES.RADIO,
    id: "RADIO-1",
    name: "RADIO-1",
    items: [
      ...generateRVs({ numberOfRvS: 3, prefix: "RADIO-1" }),
      ...generateGroups({
        numberOfGroups: 2,
        numberOfRvS: 3,
        prefix: "RADIO-1",
      }),
    ],
  },
  {
    type: ITEM_TYPES.RADIO,
    id: "RADIO-2",
    name: "RADIO-2",
    items: [
      ...generateRVs({ numberOfRvS: 2, prefix: "RADIO-2" }),
      ...generateGroups({
        numberOfGroups: 1,
        numberOfRvS: 2,
        prefix: "RADIO-2",
      }),
      
    ],
  },
  {
    type:  ITEM_TYPES.RADIO,
    id: "RADIO-3",
    name: "RADIO-3",
    items: [],
  },
  {
    type:  ITEM_TYPES.RADIO,
    id: "RADIO-4",
    name: "RADIO-4",
    items: [
      ...generateRVs({ numberOfRvS: 2, prefix: "RADIO-4" }),
    ],
  },
  {
    type:  ITEM_TYPES.RADIO,
    id: "RADIO-5",
    name: "RADIO-5",
    items: [
      ...generateRVs({ numberOfRvS: 2, prefix: "RADIO-5" }),
    ],
  },
  {
    type:  ITEM_TYPES.RADIO,
    id: "RADIO-6",
    name: "RADIO-6",
    items: [
      ...generateRVs({ numberOfRvS: 2, prefix: "RADIO-6" }),
      ...generateGroups({
        numberOfGroups: 1,
        numberOfRvS: 2,
        prefix: "RADIO-6",
      }),
    ],
  },
  {
    type:  ITEM_TYPES.RADIO,
    id: "RADIO-7",
    name: "RADIO-7",
    items: [
      ...generateRVs({ numberOfRvS: 2, prefix: "RADIO-7" }),
      ...generateGroups({
        numberOfGroups: 1,
        numberOfRvS: 2,
        prefix: "RADIO-7",
      }),
    ],
  },
];

const specialArraySlice = createSlice({
  name: 'specialArray',
  initialState,
  reducers: {
    testPing: (state) => {
      console.log('ping');
      return state;
    },
  },
})

export const { actions } = specialArraySlice;

export const store = configureStore({
  reducer: {
    specialArray: specialArraySlice.reducer,
  },
})