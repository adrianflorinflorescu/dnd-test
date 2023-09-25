import { useState } from "react";
import Checkbox from "~/components/Checkbox";

const flattenTree = (tree: Group[]): (Group | Child)[] => {
  const temp = structuredClone(tree).flatMap((group) => {
    return [group, ...(group.children ?? [])];
  });

  return temp.map((item) => {
    if (item.type === "group") {
      item.children = undefined;
    }
    return item;
  });
};

export default function MultiSelect() {
  const [tree] = useState(data);
  const [selectedChildren, setSelectedChildren] = useState<Child[]>([]);
  const [lastSelectedGroupOrChild, setLastSelectedGroupOrChild] = useState<
    Group | Child | null
  >(null);

  const flatTree = flattenTree(tree);

  function handleTweenSelection(lastIndex: number, newIndex: number, nextState: 'checked' | 'unchecked') {
    const children = flatTree.slice(
      Math.min(lastIndex, newIndex),
      Math.max(lastIndex, newIndex) + 1
    ).filter((item) => item.type === "child") as Child[];

    if(nextState === 'checked') {
      setSelectedChildren([...selectedChildren, ...children]);
    }
    else {
      setSelectedChildren(selectedChildren.filter((child) => !children.some((c) => c.name === child.name)));
    }
  }

  function handleGroupClick({
    e,
    group,
  }: {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    group: Group;
  }) {
    // Stop propagation to prevent child click
    e.stopPropagation();

    const nextState = group.children?.every((child) =>
      selectedChildren.some((c) => c.name === child.name)
    )
      ? "unchecked"
      : "checked";
    if (e.shiftKey && lastSelectedGroupOrChild) {
      console.log("Group with shift key pressed");

      const lastIndex = flatTree.findIndex((item) => item.name === lastSelectedGroupOrChild.name);
      const newIndex = flatTree.findIndex((item) => item.name === group.name);
      
      handleTweenSelection(lastIndex, newIndex, nextState);

    } else {
      setLastSelectedGroupOrChild(group);
      if (group.children?.every((child) => selectedChildren.some((c) => c.name === child.name))) {
        setSelectedChildren(
          selectedChildren.filter((child) => !group.children?.some((c) => c.name === child.name))
        );
      } else {
        setSelectedChildren([...selectedChildren, ...(group.children ?? [])]);
      }
    }
  }

  function handleChildClick({
    e,
    child,
  }: {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    child: Child;
  }) {
    // Stop propagation to prevent group click
    e.stopPropagation();
    const nextState = selectedChildren.some((selectedChild) => selectedChild.name === child.name)
      ? "unchecked"
      : "checked";

    if (e.shiftKey && lastSelectedGroupOrChild) {
      console.log("Child with shift key pressed");

      const lastIndex = flatTree.findIndex((item) => item.name === lastSelectedGroupOrChild.name);
      const newIndex = flatTree.findIndex((item) => item.name === child.name);

      handleTweenSelection(lastIndex, newIndex, nextState);
     
    } else {
      setLastSelectedGroupOrChild(child);
      if (selectedChildren.find(selectedChild => selectedChild.name === child.name)) {
        setSelectedChildren(selectedChildren.filter((c) => c.name !== child.name));
      } else {
        setSelectedChildren([...selectedChildren, child]);
      }
    }
  }

  return (
    <main className="w-full">
      <div className="m-auto w-96">
        {tree.map((group, index) => {
          return (
            <div
              key={index}
              className="flex flex-col select-none"
              onClick={(e) => handleGroupClick({ e, group })}
            >
              <div className="flex items-center">
                <Checkbox
                  state={
                    group.children?.every((child) =>
                      selectedChildren.find((c) => c.name === child.name)
                    )
                      ? "checked"
                      : group.children?.some((groupChild) =>
                          selectedChildren.find((selectedChid) => selectedChid.name === groupChild.name)
                        )
                      ? "indeterminate"
                      : "unchecked"
                  }
                />
                <p>{group.name}</p>
              </div>
              {group.children?.map((child, index) => {
                return (
                  <div
                    key={index}
                    className="ml-4 flex items-center select-none"
                    onClick={(e) => handleChildClick({ e, child })}
                  >
                    <Checkbox
                      state={
                        selectedChildren.some((c) => c.name === child.name)
                          ? "checked"
                          : "unchecked"
                      }
                    />
                    <p>{child.name}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
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
  children: Child[] | undefined;
};

var data: Group[] = [
  {
    name: "A",
    type: "group",
    children: generateChildren(5, "A"),
  },
  {
    name: "B",
    type: "group",
    children: generateChildren(5, "B"),
  },
  {
    name: "C",
    type: "group",
    children: generateChildren(5, "C"),
  }
];


function generateChildren(count: number, parentName: string): Child[] {
  return Array.from({ length: count }, (_, index) => {
    return {
      name: `${parentName}${index + 1}`,
      type: "child",
    };
  });
}
