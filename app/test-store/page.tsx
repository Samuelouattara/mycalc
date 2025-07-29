"use client";

import React from "react";
import { testStore } from "@/store/testStore";

export default function add() {
  const {
    bears,
    increasePopulation,
    decreasePopulation,
    removeAllBears,
  } = testStore();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{bears} bears around here...</h1>
      <Controls
        increasePopulation={increasePopulation}
        decreasePopulation={decreasePopulation}
        removeAllBears={removeAllBears}
      />
    </div>
  );
}

interface ControlsProps {
  increasePopulation: () => void;
  decreasePopulation: () => void;
  removeAllBears: () => void;
}

function Controls({
  increasePopulation,
  decreasePopulation,
  removeAllBears,
}: ControlsProps) {
  return (
    <>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={decreasePopulation}>one down</button>
      <button onClick={removeAllBears}>remove all</button>
    </>
  );
}
