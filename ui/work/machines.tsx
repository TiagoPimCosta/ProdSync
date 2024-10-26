import React from "react";
import MachineButton from "./machine-button";

const maquinas = [
  { name: "Maquina X", id: 1, tempoDesativado: 10 },
  { name: "Maquina Y", id: 2, tempoDesativado: 10 },
  { name: "Maquina Z", id: 3, tempoDesativado: 10 },
];

const Machines = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4 md:gap-6">
      {maquinas.map((maquina) => (
        <MachineButton
          key={maquina.id}
          name={maquina.name}
          userId={maquina.id}
          machineId={maquina.id}
          disableTime={maquina.tempoDesativado}
        />
      ))}
    </div>
  );
};

export default Machines;
