import { RVItem, RadioItem, UnassignedItem, ITEM_TYPES } from "./data-helpers";
import { useSpecialArray } from "~/useSpecialArray";


const RoadVehicleComponent = ({rv}: {
  rv: RVItem
}) => {
  return (
    <div className={`border border-red-200 p-4`}>
      <p className="text-sm">{rv.id}</p>
    </div>
  );
};


function Tree({data}: {data: (UnassignedItem | RadioItem)[]}) {
  return (
    <div>
      {data.map((dataItem) => {
        return (
          <div
            key={dataItem.id}
            className="border border-green-200 p-4"
          >
            <h1 className="font-bold">{dataItem.name}</h1>
            <div>
              {dataItem.items && dataItem.items.length > 0 && dataItem.items.map((item, index) => {
                if (item.type === "RV") {
                  return (
                        <div
                          key={item.id}
                        >
                          <RoadVehicleComponent rv={item} />
                        </div>
                  );
                } else {
                  return (
                        <div
                          key={item.id}
                          className="border border-yellow-300 p-4"
                        >
                          <h2> Group:{item.name}</h2>
                          <div>
                            {item.items.map((rv) => {
                              if(rv.type !== "RV") {
                                return null;
                              }
                              return (
                                    <div
                                      key={rv.id}
                                    >
                                      <RoadVehicleComponent rv={rv} />
                                    </div>
                              );
                            })}
                            {item.items && item.items.length === 0 && (
                              <div className="border border-yellow-300 p-4">
                                <h2>No items in group</h2>
                              </div>
                            )}
                          </div>
                        </div>
                  );
                }
              })}
              {dataItem.items && dataItem.items.length === 0 && (
                <div className="border border-yellow-300 p-4">
                  <h2>No items in {dataItem.type === ITEM_TYPES.RADIO ? "radio" : "unassigned"}</h2>
                </div>
              )}
            </div>
          </div>
        );
      }
      )} 
    </div>
  );
}


function NoDnd() {

  const data = useSpecialArray();


  const unassignedData = data.filter((item) => item.id === "UNASSIGNED");
  const restData = data.filter((item) => item.id !== "UNASSIGNED");

  return (
    <div className="m-auto flex w-[1200px] p-8">
        <div className="flex w-1/2 flex-col">
          <Tree data={restData} />
        </div>
        <div className="flex w-1/2 flex-col">
          <Tree data={unassignedData} />
        </div>
    </div>
  );
}

export default NoDnd;