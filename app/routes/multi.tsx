import { useState } from "react";
import type { GChild, Group } from "./multiselect";
import { generateChildren } from "./multiselect";
import Checkbox from "~/components/Checkbox/Checkbox";
import Arrow from "~/components/Arrow";
import { generateRandomString } from "~/components/randomStringGenerator";

export const MAX_ALLOWED_SELECTED = 20;



function GroupBlock({
  group,
  selected,
  onSelect,
  onUnselect,
  hasReachedMax,
}: {
  group: Group;
  selected: GChild[];
  onSelect: (children: GChild[]) => void;
  onUnselect: (children: GChild[]) => void;
  hasReachedMax: boolean;
}) {

  const [isExpanded, setIsExpanded] = useState(true);

  function handleChange({ child }: { child: GChild }) {
    if (selected.some((c) => c.name === child.name)) {
      onUnselect([child]);
    } else {
      onSelect([child]);
    }
  }

  const selectedOnGroup = selected.filter((c) => c.parentName === group.name);
  const isGroupSelected =
    !!selectedOnGroup.length &&
    selectedOnGroup.length > 0 &&
    selectedOnGroup.length === group.children?.length;
  const isGroupMaxed =
    selectedOnGroup.length >= MAX_ALLOWED_SELECTED || hasReachedMax;

  function handleGroupChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (isGroupMaxed || isGroupSelected) {
      console.log("handleGroupChange", "unselect", e);
      onUnselect(selectedOnGroup);
    } else {
      onSelect(
        group.children
          ? [
              ...group.children.filter(
                (c) => !selectedOnGroup.some((c2) => c2.name === c.name)
              ),
            ].slice(0, MAX_ALLOWED_SELECTED - selected.length)
          : []
      );
    }
  }

  const groupState = isGroupSelected
    ? "checked"
    : selectedOnGroup.length > 0
    ? "indeterminate"
    : "unchecked";

  return (
    <div className="mb-4 last:mb-0 bg-gray-50 border">
      <label className="flex w-full gap-2 p-2 border-b items-center">
        <Checkbox
          state={groupState}
          onChange={handleGroupChange}
          disabled={
            (!isGroupMaxed && hasReachedMax) ||
            (!isGroupSelected &&
              hasReachedMax &&
              groupState !== "indeterminate")
          }
        />
        <p
        className="text-base"
        >{group.name}</p>
        <button
          className="ml-auto"
          onClick={(e) => {
            console.log('e.target.nodeName', e.currentTarget.nodeName);
            e.stopPropagation();
            setIsExpanded((prev) => !prev)
          }}
        >
          {isExpanded ? <div className="-rotate-180 transition-all"><Arrow width={18} height={18} /></div> : <div className="transition-all"><Arrow  width={18} height={18}  /></div>}
        </button>
      </label>
      <div className={`grid grid-cols-2 ${isExpanded ? "" : "hidden"}`}>
        {group.children?.map((child, index) => {
          const isSelected = selected.some((c) => c.name === child.name);
          const isDisabled = hasReachedMax && !isSelected;
          // fist two items are white, than next two are gray, and so on
          const isWhite = index % 4 < 2;
          const isLastAndOdd = index === group.children!.length - 1 && index % 2 === 0;
          return (
            <div key={index} className={`p-2 ${isWhite ? "bg-white bg-opacity-20" : "bg-gray-200 bg-opacity-20"} ${isLastAndOdd ? "col-span-2" : ""}`}>
              <label className="flex select-none items-start gap-2">
                <Checkbox
                  state={isSelected ? "checked" : "unchecked"}
                  onChange={() => {
                    handleChange({ child });
                  }}
                  disabled={isDisabled}
                  className="top-1 relative"
                />
                <p className="text-sm first-letter:uppercase flex-1 text-gray-500">{generateRandomString({i: index})}</p>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Multi() {
  const groups: Group[] = [
    {
      name: "Profile single",
      type: "group",
      children: generateChildren(1, "Profile single"),
    },
    {
      name: "Profile two",
      type: "group",
      children: generateChildren(2, "Profile two"),
    },
    {
      name: "Profile three",
      type: "group",
      children: generateChildren(3, "Profile three"),
    },
    {
      name: "Profile four",
      type: "group",
      children: generateChildren(4, "Profile four"),
    },
    {
      name: "Profile five",
      type: "group",
      children: generateChildren(5, "Profile five"),
    },
    {
      name: "Profile six",
      type: "group",
      children: generateChildren(6, "Profile six"),
    },
    {
      name: "Profile seven",
      type: "group",
      children: generateChildren(7, "Profile seven"),
    },
    {
      name: "Profile eight",
      type: "group",
      children: generateChildren(8, "Profile eight"),
    },
    {
      name: "Profile nine",
      type: "group",
      children: generateChildren(9, "Profile nine"),
    },
    {
      name: "Profile ten",
      type: "group",
      children: generateChildren(10, "Profile ten"),
    },
    {
      name: "Profile eleven",
      type: "group",
      children: generateChildren(11, "Profile eleven"),
    },
    {
      name: "Profile twelve",
      type: "group",
      children: generateChildren(12, "Profile twelve"),
    },
    {
      name: "Profile thirteen",
      type: "group",
      children: generateChildren(13, "Profile thirteen"),
    },
    {
      name: "Profile fourteen",
      type: "group",
      children: generateChildren(14, "Profile fourteen"),
    },
    {
      name: "Profile fifteen",
      type: "group",
      children: generateChildren(15, "Profile fifteen"),
    },
    {
      name: "Profile sixteen",
      type: "group",
      children: generateChildren(16, "Profile sixteen"),
    },
    {
      name: "Profile seventeen",
      type: "group",
      children: generateChildren(17, "Profile seventeen"),
    },
    {
      name: "Profile eighteen",
      type: "group",
      children: generateChildren(18, "Profile eighteen"),
    },
    {
      name: "Profile nineteen",
      type: "group",
      children: generateChildren(19, "Profile nineteen"),
    },
    {
      name: "Profile twenty",
      type: "group",
      children: generateChildren(20, "Profile twenty"),
    },
    {
      name: "Profile twenty-one",
      type: "group",
      children: generateChildren(21, "Profile twenty-one"),
    },
    {
      name: "Profile twenty-two",
      type: "group",
      children: generateChildren(22, "Profile twenty-two"),
    },
  ];

  const [selectedChildren, setSelectedChildren] = useState<GChild[]>([]);

  function handleSelect(children: GChild[]) {
    console.log("handleSelect", children);
    if (selectedChildren.length + children.length > MAX_ALLOWED_SELECTED) {
      console.log("handleSelect", "too much");
      return;
    }
    setSelectedChildren([...selectedChildren, ...children]);
  }

  function handleUnselect(children: GChild[]) {
    setSelectedChildren(
      selectedChildren.filter((c) => !children.some((c2) => c2.name === c.name))
    );
  }

  function handleSelectAll() {
    setSelectedChildren((prev) => {
      const allUnselectedChildren = groups.reduce<GChild[]>((acc, group) => {
        return [
          ...acc,
          ...(group.children?.filter(
            (c) => !selectedChildren.some((c2) => c2.name === c.name)
          ) ?? []),
        ];
      }, []);
      const toAddItems = allUnselectedChildren.slice(
        0,
        MAX_ALLOWED_SELECTED - selectedChildren.length
      );

      return [...prev, ...toAddItems];
    });
  }

  function handleUnselectAll() {
    setSelectedChildren([]);
  }

  const hasReachedMax = selectedChildren.length >= MAX_ALLOWED_SELECTED;
  const isMaxGreaterThanSelectable = MAX_ALLOWED_SELECTED > groups.reduce((acc, group) => acc + (group.children?.length ?? 0), 0);
  const areAllSelected = selectedChildren.length === groups.reduce((acc, group) => acc + (group.children?.length ?? 0), 0);

  return (
    <div className="bg-gray-200 w-full h-full flex gap-4 justify-center items-center">
      <div className="mx-auto bg-white shadow-md border border-gray-200 flex max-h-[calc(100vh-200px)] w-[720px]  flex-col">
        <div className={`shadow relative z-10`}>
          <div className="flex w-full gap-4 items-center p-4">
            <div className="text-sm">
              <p className="text-lg leading-none">Select profile and scenarios</p>
            </div>

            <div className="flex gap-2 ml-auto items-start text-sm">
              {!hasReachedMax && !areAllSelected && <button
                className="border border-gray-300 px-4 py-2 bg-white"
                onClick={handleSelectAll}
              >
                Select all
              </button>
              }
              {selectedChildren.length > 0 && 
                <button
                  className="border border-gray-300 px-4 py-2 bg-white"
                  onClick={handleUnselectAll}
                >
                  Unselect all
                </button>
              }
            </div>
          </div>
        </div>
        <div className="max-h-full overflow-auto p-4">
          {groups.map((group) => {
            return (
              <GroupBlock
                key={group.name}
                group={group}
                selected={selectedChildren}
                onSelect={handleSelect}
                onUnselect={handleUnselect}
                hasReachedMax={hasReachedMax}
              />
            );
          })}
        </div>
        <div className="flex p-4 bg-slate-50 border-t">
            <div className="">
              {hasReachedMax ? (
                <p className="text-sm  text-green-800 p-2 pl-0  leading-none">
                   ✅ You have reached the max ({MAX_ALLOWED_SELECTED}), to change selection, unselect some items 
                </p>
              ) : (
                <p className=" bg-green-0 text-sm text-green-800 p-2 pl-0 leading-none">
                  {isMaxGreaterThanSelectable ? 'Select items to add to your profile and scenarios' : `Maximum selectable items: ${MAX_ALLOWED_SELECTED} (${selectedChildren.length}/${MAX_ALLOWED_SELECTED} selected)`}
                </p>
              )}
              </div>
            <div className="flex items-end gap-4 ml-auto">
            <button>
              Cancel
            </button>
            <button>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
