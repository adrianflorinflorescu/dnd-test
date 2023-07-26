interface BaseItem {
  id: string;
  name: string;
}

enum ITEM_TYPES {
  "RV" = "RV",
  "GROUP" = "GROUP",
  "UNASSIGNED" = "UNASSIGNED",
  "RADIO" = "RADIO",
}

export interface RVItem extends BaseItem {
  type: ITEM_TYPES.RV;
}

interface GroupItem extends BaseItem {
  type: ITEM_TYPES.GROUP;
  items: RVItem[];
}

interface UnassignedItem extends BaseItem {
  type: ITEM_TYPES.UNASSIGNED;
  items: Array<RVItem | GroupItem>;
}

interface RadioItem extends BaseItem {
  type: ITEM_TYPES.RADIO;
  items: Array<RVItem | GroupItem>;
}


function generateRVs({
  numberOfRvS,
  prefix,
}: {
  numberOfRvS: number;
  prefix: string;
}): RVItem[] {
  const rvs: RVItem[] = [];
  for (let i = 0; i < numberOfRvS; i++) {
    rvs.push({
      type: ITEM_TYPES.RV,
      id: `${prefix}-RV-${i}`,
      name: `${prefix}-RV-${i}`,
    });
  }
  return rvs;
}

function generateGroups({
  numberOfGroups,
  numberOfRvS,
  prefix,
}: {
  numberOfGroups: number;
  numberOfRvS: number;
  prefix: string;
}): GroupItem[] {
  const groups: GroupItem[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    groups.push({
      type: ITEM_TYPES.GROUP,
      id: `${prefix}-GROUP-${i}`,
      name: `${prefix}-GROUP-${i}`,
      items: generateRVs({ numberOfRvS, prefix: `${prefix}-GROUP-${i}` }),
    });
  }
  return groups;
}

type DataType = [UnassignedItem, ...RadioItem[]];


const DATA: DataType = [
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


export function moveRVToUnassigned({rv, data}: {rv: RVItem, data: DataType}): DataType {

  const rvClone = structuredClone(rv);
  const dataClone = structuredClone(data);

  // Remove item from it's original location

  dataClone.forEach((radio) => {
    radio.items.forEach((item, index) => {
      if (item.id === rv.id) {
        radio.items.splice(index, 1);
      }

      if (item.type === ITEM_TYPES.GROUP) {
        item.items.forEach((groupItem, groupIndex) => {
          if (groupItem.id === rv.id) {
            item.items.splice(groupIndex, 1);
          }
        });
      }
    });
  });

  // Add item to unassigned

  dataClone[0].items.push(rvClone);

  return dataClone;


}

export {DATA};