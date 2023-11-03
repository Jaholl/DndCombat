import { Button, Label, Field } from "@fluentui/react-components";
import { useState } from "react";

const Counter = (startHp: number, name: string) => {
  const [hp, setCount] = useState<number>(startHp);
  let change = 0;

  return (
    <>
      <div>
        <Label>{name}: </Label>
      </div>
      <div>
        <Label htmlFor="valueInput">{hp}</Label>
      </div>
      <Field id="valueInput" />
      <Button onClick={() => setCount((hp) => hp - change)}>Apply</Button>
    </>
  );
};

export default Counter;
