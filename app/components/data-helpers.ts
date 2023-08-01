interface BaseItem {
  id: string;
  name: string;
}

export enum ITEM_TYPES {
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

export interface UnassignedItem extends BaseItem {
  type: ITEM_TYPES.UNASSIGNED;
  items: Array<RVItem | GroupItem>;
}

export interface RadioItem extends BaseItem {
  type: ITEM_TYPES.RADIO;
  items: Array<RVItem | GroupItem>;
}


export function generateRVs({
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

export function generateGroups({
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

export type DataType = [UnassignedItem, ...RadioItem[]];