import { useState } from "react";
import type { GChild, Group } from "./multiselect";
import { generateChildren } from "./multiselect";
import Checkbox from "~/components/Checkbox";

export const MAX_ALLOWED_SELECTED = 5;

function GroupBlock({
  group,
  selected,
  onSelect,
  onUnselect,
}: {
  group: Group;
  selected: GChild[];
  onSelect: (children: GChild[]) => void;
  onUnselect: (children: GChild[]) => void;
}) {

  function handleChange({child }: { child: GChild}) {
    if (selected.some((c) => c.name === child.name)) {
      onUnselect([child]);
    } else {
      onSelect([child]);
    }
  }

  const selectedOnGroup = selected.filter((c) => c.name.startsWith(group.name));

  return (
    <div className="border border-sky-300">
      <label className="bg-amber-100 w-full block p-4">
        <Checkbox
          state={
            // If all children from this group are selected, state is "checked"
            // If some children from this group are selected, state is "indeterminate"
            // If no children from this group are selected, state is "unchecked"
            selectedOnGroup.length === group.children?.length ? "checked" : selectedOnGroup.length > 0 ? "indeterminate" : "unchecked"
          }
          onChange={() => {
            if (selectedOnGroup.length === group.children?.length) {
              onUnselect(selectedOnGroup);
            } else {
              onSelect(group.children ? [...group.children.filter((c) => !selectedOnGroup.some((c2) => c2.name === c.name))] : []);
            }
          }}
        />
        {group.name}
      </label>
      <div className="grid grid-cols-2 gap-4 py-4">
      {group.children?.map((child, index) => {
        return (
          <div key={index} className="">
            <label className="flex select-none items-center px-4">
              <Checkbox
                state={
                  selected.some((c) => c.name === child.name)
                    ? "checked"
                    : "unchecked"
                }
                onChange={() => {
                    handleChange({ child });
                }}
              />
              <p>{child.name}</p>
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
      children: generateChildren(15, "Profile_A"),
    },
    {
      name: "Profile_B",
      type: "group",
      children: generateChildren(15, "Profile_B"),
    },
    {
      name: "Profile_C",
      type: "group",
      children: generateChildren(15, "Profile_C"),
    },
  ];

  const [selectedChildren, setSelectedChildren] = useState<GChild[]>([]);

  function handleSelect(children: GChild[]) {
    setSelectedChildren([...selectedChildren, ...children]);
  }

  function handleUnselect(children: GChild[]) {
    setSelectedChildren(
      selectedChildren.filter((c) => !children.some((c2) => c2.name === c.name))
    );
  }

  return (
    <div className="border border-red-100 m-4 p-4 flex gap-4 flex-col">
      {groups.map((group) => {
        return (
          <GroupBlock
            key={group.name}
            group={group}
            selected={selectedChildren}
            onSelect={handleSelect}
            onUnselect={handleUnselect}
          />
        );
      })}
    </div>
  );
}
