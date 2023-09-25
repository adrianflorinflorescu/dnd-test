import { useState } from "react";
import Checkbox from "~/components/Checkbox";

export default function MultiSelect() {
  const [tree] = useState(data);
  const [selectedChildren, setSelectedChildren] = useState<any[]>([]);
  const [lastSelectedChild, setLastSelectedChild] = useState<any>(null);

  function handleGroupClick({
    e,
    group,
  }: {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    group: Group;
  }) {
    e.stopPropagation();
    // Add all children to selectedChildren
    if (group.children.every(child => selectedChildren.includes(child))) {
      setSelectedChildren(selectedChildren.filter(child => !group.children.includes(child)));
    } else {
      setSelectedChildren([...selectedChildren, ...group.children]);
    }
  }

  function handleChildClick({
    e,
    child,
  }: {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    child: Child;
  }) {
    e.stopPropagation();
    // toggle
    if (selectedChildren.includes(child)) {
      setSelectedChildren(selectedChildren.filter(c => c !== child));
    } else {
      setSelectedChildren([...selectedChildren, child]);
    }

  }

  return (
    <main className="w-full">
      <div className="m-auto w-96">
        {tree.map((group, index) => {
          return (
            <div
              key={index}
              className="flex flex-col"
              onClick={(e) => handleGroupClick({ e, group })}
            >
              <div className="flex items-center">
                <Checkbox state={
                  group.children.every(child => selectedChildren.includes(child))
                    ? "checked"
                    : group.children.some(child => selectedChildren.includes(child))
                    ? "indeterminate"
                    : "unchecked"
                }
                />
                <label>{group.name}</label>
              </div>
              {group.children.map((child, index) => {
                return (
                  <div
                    key={index}
                    className="ml-4 flex items-center"
                    onClick={(e) => handleChildClick({ e, child })}
                  >
                    <Checkbox state={
                      selectedChildren.includes(child)
                        ? "checked"
                        : lastSelectedChild === child
                        ? "indeterminate"
                        : "unchecked"
                    } 
                    />
                    <label>{child.name}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <pre>{JSON.stringify({ tree }, null, 2)}</pre>
    </main>
  );
}

type Child = {
  name: string;
  type: "child";
};

type Group = {
  name: string;
  type: "group";
  children: Child[];
};

var data: Group[] = [
  {
    name: "A",
    type: "group",
    children: [
      {
        name: "A1",
        type: "child",
      },
      {
        name: "A2",
        type: "child",
      },
      {
        name: "A3",
        type: "child",
      },
    ],
  },
  {
    name: "B",
    type: "group",
    children: [
      {
        name: "B1",
        type: "child",
      },
      {
        name: "B2",
        type: "child",
      },
      {
        name: "B3",
        type: "child",
      },
    ],
  },
];
