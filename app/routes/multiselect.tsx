import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Checkbox from "~/components/Checkbox";

const flattenTree = (tree: Group[]): (Group | GChild)[] => {
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
  const [selectedChildren, setSelectedChildren] = useState<GChild[]>([]);
  const [lastSelectedGroupOrChild, setLastSelectedGroupOrChild] = useState<
    Group | GChild | null
  >(null);

  const flatTree = flattenTree(tree);

  function handleTweenSelection(lastIndex: number, newIndex: number, nextState: 'checked' | 'unchecked') {
    console.log({lastIndex, newIndex, nextState});
    const children = flatTree.slice(
      Math.min(lastIndex, newIndex),
      Math.max(lastIndex, newIndex) + 1
    ).filter((item) => item.type === "child") as GChild[];

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
    child: GChild;
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

  function handleDragStart(result: any) {
    console.log('start');
  }

  function handleDragEnd(result: any) {
    console.log('end');
  }
  return (
    <main className="w-full">
      <div className="m-auto w-96">
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        {tree.map((group, index) => {
          return (
            <Droppable droppableId={group.name} key={group.name}>
                        {(provided, snapshot) => { return(
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
                  <Draggable draggableId={child.name} index={index} key={child.name}>
                                                        {(provided, snapshot) => (
                  <div
                    key={index}
                    className="ml-4 flex items-center select-none"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                  )}
                  </Draggable>
                );
              })}
            </div>
            )}
        }</Droppable>
          );
        })}
        </DragDropContext>
      </div>
    </main>
  );
}

export type GChild = {
  name: string;
  type: "child";
};

export type Group = {
  name: string;
  type: "group";
  children: GChild[] | undefined;
};

var data: Group[] = [
  {
    name: "A",
    type: "group",
    children: generateChildren(335, "A"),
  },
  {
    name: "B",
    type: "group",
    children: generateChildren(335, "B"),
  },
  {
    name: "C",
    type: "group",
    children: generateChildren(335, "C"),
  }
];


export function generateChildren(count: number, parentName: string): GChild[] {
  return Array.from({ length: count }, (_, index) => {
    return {
      name: `${parentName}${index + 1}`,
      type: "child",
    };
  });
}
