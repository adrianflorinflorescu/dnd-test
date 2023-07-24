import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult, OnDragEndResponder } from "react-beautiful-dnd";
const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState<
    {
      id: string;
      name: string;
      items: { id: string; name: string }[];
      tint: number;
    }[]
  >(DATA);


    const handleDragEnd: OnDragEndResponder = (result: DropResult) => {
        const { destination, source, type } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        if (type === "group") {
            const newStores = [...stores];
            const [removed] = newStores.splice(source.index, 1);
            newStores.splice(destination.index, 0, removed);
            setStores(newStores);
            return;
        }
        const sourceStore = stores.find((store) => store.id === source.droppableId);

        if(!sourceStore) return;


        const destinationStore = stores.find((store) => store.id === destination.droppableId);
        if (sourceStore === destinationStore) {
            const newItems = [...sourceStore.items];
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);
            const newStore = { ...sourceStore, items: newItems };
            const newStores = stores.map((store) => (store.id === newStore.id ? newStore : store));
            setStores(newStores);
            return;
        }

        const sourceItems = [...sourceStore.items];
        const [removed] = sourceItems.splice(source.index, 1);
        const newSourceStore = { ...sourceStore, items: sourceItems };

        if(!destinationStore) return;

        const destinationItems = [...destinationStore.items];
        destinationItems.splice(destination.index, 0, removed);
        const newDestinationStore = { ...destinationStore, items: destinationItems };
        const newStores = stores.map((store) => {
            if (store.id === newSourceStore.id) return newSourceStore;
            if (store.id === newDestinationStore.id) return newDestinationStore;
            return store;
        });
        setStores(newStores);
    };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    index={index}
                    key={store.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <StoreList {...store} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

function StoreList({ name, items, id }: {
  name: string;
  items: { id: string; name: string }[];
  id: string;
}) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store-container">
            <h3 className="text-red-200">{name}</h3>
          </div>
          <div className="items-container">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default App;