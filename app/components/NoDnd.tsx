import { useState } from "react";

import { DATA, RVItem, moveRVToUnassigned } from "./data-helpers";

function NoDnd() {

  const [data, setData] = useState(DATA);
  const [selectedItemsForDrag] = useState<string[]>([]);

  const allRvs = data.flatMap((radio) => {
    return radio.items.flatMap((item) => {
      if (item.type === "RV") {
        return item;
      } else {
        return item.items;
      }
    });
  });

  const RoadVehicleComponent = ({rv, onMoveToUnassigned}: {
    rv: RVItem
    onMoveToUnassigned: (item: RVItem) => void;
  }) => {
    const [isMoveBoxVisible, setIsMoveBoxVisible] = useState(false);

    return (
      <div 
        className={`${selectedItemsForDrag.includes(rv.id) ? "bg-green-200" : ""} border border-red-200 p-4`}
        
      >
        <p className="text-sm">{rv.id}</p>

        <button
          className="bg-blue-200 p-2"
          onClick={() => {
            setIsMoveBoxVisible(!isMoveBoxVisible);
          }}
        >
          Move to
        </button>

        {isMoveBoxVisible && (
            <div>
                <button
                  className="bg-blue-200 p-2"
                  onClick={() => {
                    setIsMoveBoxVisible(false);
                    onMoveToUnassigned(rv);
                  }}
                >
                  Move to Unassigned
                </button>    
            </div>
        )}
              
      </div>
    );
  };

  function handleMoveToUnassigned(item: RVItem) {
    console.log("move to unassigned");

    const newData = moveRVToUnassigned({rv: item, data});

    console.log("newData", newData);

    setData(newData);
  }

  return (
    <div className="m-auto flex w-[1200px] p-8">
        <div className="flex w-1/2 flex-col">
          {data.map((radio) => {
            return (
                  <div
                    key={radio.id}
                    className="border border-green-200 p-4"
                  >
                    <h1 className="font-bold">{radio.name}</h1>
                    <div>
                      {radio.items && radio.items.length > 0 && radio.items.map((item, index) => {
                        if (item.type === "RV") {
                          return (
                                <div
                                  key={item.id}
                                >
                                  <RoadVehicleComponent 
                                    onMoveToUnassigned={handleMoveToUnassigned} 
                                    rv={item}
                                />
                                </div>
       
                          );
                        } else {
                          return (
                                <div
                                  key={item.id}
                                  className="border border-yellow-300 p-4"
                                >
                                  <h2>{item.name}</h2>
                                  <div>
                                    {item.items.map((rv) => {
                                      if(rv.type !== "RV") {
                                        return null;
                                      }
                                      return (
                                            <div
                                              key={rv.id}
                                            >
                                              <RoadVehicleComponent 
                                                onMoveToUnassigned={handleMoveToUnassigned} 
                                                rv={rv}
                                              />
                                            </div>
                                            
                                      );  
                                    })}

                                    {item.items && item.items.length === 0 && (
                                      <div className="border border-yellow-300 p-4">
                                        <h2>No items</h2>
                                      </div>
                                    )}
                                  </div>
                                </div>
                          );
                        }
                      })}

                      {radio.items && radio.items.length === 0 && (
                        <div className="border border-yellow-300 p-4">
                          <h2>No items</h2>
                        </div>
                      )}
                    </div>
                  </div>
            );
          }
          )}
        </div>
        <div className="flex w-1/2 flex-col">
          <div className="border border-blue-200 p-4">
            <pre>{JSON.stringify({allRvs}, null, 2)}</pre>
          </div>
        </div>  
    </div>
  );

}

export default NoDnd;