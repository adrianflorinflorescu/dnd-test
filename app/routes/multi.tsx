import { useState } from "react";
import type { GChild, Group } from "./multiselect";
import { generateChildren } from "./multiselect";
import Checkbox from "~/components/Checkbox";
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

  const selectedOnGroup = selected.filter((c) => c.name.startsWith(group.name));
  const isGroupSelected =
    !!selectedOnGroup.length &&
    selectedOnGroup.length > 0 &&
    selectedOnGroup.length === group.children?.length;
  const isGroupMaxed =
    selectedOnGroup.length >= MAX_ALLOWED_SELECTED || hasReachedMax;

  function handleGroupChange(
    newState: "checked" | "unchecked" | "indeterminate"
  ) {
    if (isGroupMaxed || isGroupSelected) {
      console.log("handleGroupChange", "unselect");
      onUnselect(selectedOnGroup);
    } else {
      console.log("handleGroupChange", "select", { newState });
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
    <div className="mb-4">
      <label className="flex w-full gap-2 bg-blue-100 p-2">
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
        className="font-semibold text-base"
        >{group.name}</p>
        <button
          className="ml-auto"
          onClick={(e) => {
            console.log('e.target.nodeName', e.currentTarget.nodeName);
            e.stopPropagation();
            setIsExpanded((prev) => !prev)
          }}
        >
          {isExpanded ? <div className="rotate-180"><Arrow width={24} height={24} /></div> : <div><Arrow  width={24} height={24}  /></div>}
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
            <div key={index} className={`p-2 ${isWhite ? "bg-white" : "bg-gray-100"} ${isLastAndOdd ? "col-span-2" : ""}`}>
              <label className="flex select-none items-start gap-2">
                <Checkbox
                  state={isSelected ? "checked" : "unchecked"}
                  onChange={() => {
                    handleChange({ child });
                  }}
                  disabled={isDisabled}
                  className="top-1 relative"
                />
                <p className="text-sm first-letter:uppercase">{generateRandomString({i: index})}</p>
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
      name: "Profile_A",
      type: "group",
      children: generateChildren(1, "Profile_A"),
    },
    {
      name: "Profile_B",
      type: "group",
      children: generateChildren(2, "Profile_B"),
    },
    {
      name: "Profile_C",
      type: "group",
      children: generateChildren(3, "Profile_C"),
    },
    {
      name: "Profile_D",
      type: "group",
      children: generateChildren(4, "Profile_D"),
    },
    {
      name: "Profile_E",
      type: "group",
      children: generateChildren(5, "Profile_E"),
    },
    {
      name: "Profile_F",
      type: "group",
      children: generateChildren(6, "Profile_F"),
    },
    {
      name: "Profile_G",
      type: "group",
      children: generateChildren(7, "Profile_G"),
    },
    {
      name: "Profile_H",
      type: "group",
      children: generateChildren(8, "Profile_H"),
    },
    {
      name: "Profile_I",
      type: "group",
      children: generateChildren(9, "Profile_I"),
    },
    {
      name: "Profile_J",
      type: "group",
      children: generateChildren(10, "Profile_J"),
    },
    {
      name: "Profile_K",
      type: "group",
      children: generateChildren(11, "Profile_K"),
    },
    {
      name: "Profile_L",
      type: "group",
      children: generateChildren(12, "Profile_L"),
    },
    {
      name: "Profile_M",
      type: "group",
      children: generateChildren(13, "Profile_M"),
    },
    {
      name: "Profile_N",
      type: "group",
      children: generateChildren(14, "Profile_N"),
    },
    {
      name: "Profile_O",
      type: "group",
      children: generateChildren(15, "Profile_O"),
    },
    {
      name: "Profile_P",
      type: "group",
      children: generateChildren(16, "Profile_P"),
    },
    {
      name: "Profile_Q",
      type: "group",
      children: generateChildren(17, "Profile_Q"),
    },
    {
      name: "Profile_R",
      type: "group",
      children: generateChildren(18, "Profile_R"),
    },
    {
      name: "Profile_S",
      type: "group",
      children: generateChildren(19, "Profile_S"),
    },
    {
      name: "Profile_T",
      type: "group",
      children: generateChildren(20, "Profile_T"),
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

  return (
    <div className="bg-gray-200 w-full h-full flex justify-center items-center">
      <div className="mx-auto bg-white shadow-md border border-gray-200 flex max-h-[calc(100vh-200px)] w-[720px]  flex-col  gap-4 p-4">
        <div>
          <div className="flex h-10 w-full justify-between gap-4">
            <div className="text-sm">
              <p className="text-base">
                Select some items from the list below
              </p>
              <div className="">
              {hasReachedMax ? (
                <p className="bg-green-100 text-sm  text-green-800">
                  ✅ You have reached the max, to change selection, unselect some
                  items
                </p>
              ) : (
                <p className="text-sm">
                  Maximum selectable items: {MAX_ALLOWED_SELECTED}
                </p>
              )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="rounded-md border border-gray-300 px-2"
                onClick={handleSelectAll}
              >
                Select all
              </button>
              <button
                className="rounded-md border border-gray-300 px-2"
                onClick={handleUnselectAll}
              >
                Unselect all
              </button>
            </div>
          </div>
        </div>
        <div className="max-h-full overflow-auto border border-gray-300 p-4">
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
        <div className="flex items-end justify-end gap-4">
          <button>
            Cancel
          </button>
          <button>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
