import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface RoadVehicle {
  type: "RV";
  id: string;
  name: string;
}

interface Group {
  type: "GROUP";
  id: string;
  name: string;
  items: RoadVehicle[];
}

function generateRVs({
  numberOfRvS,
  prefix,
}: {
  numberOfRvS: number;
  prefix: string;
}): RoadVehicle[] {
  const rvs: RoadVehicle[] = [];
  for (let i = 0; i < numberOfRvS; i++) {
    rvs.push({
      type: "RV",
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
}): Group[] {
  const groups: Group[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    groups.push({
      type: "GROUP",
      id: `${prefix}-GROUP-${i}`,
      name: `${prefix}-GROUP-${i}`,
      items: generateRVs({ numberOfRvS, prefix: `${prefix}-GROUP-${i}` }),
    });
  }
  return groups;
}

export const DATA = [
  {
    type: "RADIO",
    id: "RADIO-1",
    name: "RADIO-1",
    items: [
      ...generateRVs({ numberOfRvS: 3, prefix: "RADIO-1" }),
      ...generateGroups({
        numberOfGroups: 3,
        numberOfRvS: 3,
        prefix: "RADIO-1",
      }),
    ],
  },
  {
    type: "RADIO",
    id: "RADIO-2",
    name: "RADIO-2",
    items: generateGroups({
      numberOfGroups: 3,
      numberOfRvS: 3,
      prefix: "RADIO-2",
    }),
  },
];
function Radios() {
  const RoadVehicleComponent = (rv: RoadVehicle) => {
    return (
      <div className="border border-gray-200 p-4">
        <p className="text-sm">{rv.id}</p>
      </div>
    );
  };

  function handleDragEnd(e: any) {
    console.log("drag end", e);
  }

  return (
    <div className="m-auto flex w-[800px] p-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-1/2 flex-col">
          {DATA.map((radio) => {
            return (
              <Droppable droppableId={radio.id} key={radio.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="border border-green-200 p-4"
                  >
                    <h1 className="font-bold">{radio.name}</h1>
                    <div>
                      {radio.items.map((item, index) => {
                        if (item.type === "RV") {
                          return (
                            <Draggable
                              draggableId={item.id}
                              index={index}
                              key={item.id}
                            >
                              {(provided) => (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <RoadVehicleComponent {...item} />
                                </div>
                              )}
                            </Draggable>
                          );
                        } else {
                          return (
                            <Draggable
                              draggableId={item.id}
                              index={index}
                              key={item.id}
                            >
                              {(provided) => (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  className="border border-yellow-300 p-4"
                                >
                                  <h2>{item.name}</h2>
                                  <div>
                                    {item.items.map((rv) => {
                                      return (
                                        <Draggable
                                          draggableId={rv.id}
                                          index={index}
                                          key={rv.id}
                                        >
                                          {(provided) => (
                                            <div
                                              {...provided.dragHandleProps}
                                              {...provided.draggableProps}
                                              ref={provided.innerRef}
                                            >
                                              <RoadVehicleComponent {...rv} />
                                            </div>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
export default Radios;
