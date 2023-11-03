import { useState } from "react";
import "./App.css";
import { AddRegular } from "@fluentui/react-icons";
import {
  shorthands,
  makeStyles,
  Label,
  CheckboxProps,
  Input,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  inputWidth: {
    width: "100px",
    ...shorthands.margin("5px"),
  },
});

interface combatant {
  name: string;
  initiative: number;
  dexMod: number;
  armorClass: number;
  startHp: number;
  currentHp: number;
  pendingDamage: number;
  player: CheckboxProps["checked"];
}

function App() {
  const styles = useStyles();
  const [combatcombatants, setCombatants] = useState<combatant[]>([]);
  const [combatantName, setCombatantName] = useState<string>("");
  const [combatantInitiative, setCombatantInitiative] = useState<number>(0);
  const [combatantDexMod, setCombatantDexMod] = useState<number>(0);
  const [combatantAC, setCombatantAC] = useState<number>(0);
  const [combatantHP, setCombatantHP] = useState<number>(0);
  const [_, setDamage] = useState<number>(0);
  const [combatantPlayer, setcombatantPlayer] =
    useState<CheckboxProps["checked"]>(false);

  return (
    <>
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Label htmlFor="nameInput">Name: </Label>
          <Input
            id="nameInput"
            className={styles.inputWidth}
            value={combatantName}
            onChange={(_, data) => setCombatantName(data.value)}
          ></Input>
          <Label htmlFor="initiative">Initiative: </Label>
          <Input
            type="number"
            id="initiative"
            className={styles.inputWidth}
            onChange={(_, data) => setCombatantInitiative(parseInt(data.value))}
          ></Input>
          <Label htmlFor="dexMod">Dex mod: </Label>
          <Input
            type="number"
            id="dexMod"
            className={styles.inputWidth}
            onChange={(_, data) => setCombatantDexMod(parseInt(data.value))}
          ></Input>
          <Label htmlFor="acInput">AC: </Label>
          <Input
            type="number"
            id="acInput"
            className={styles.inputWidth}
            onChange={(_, data) => setCombatantAC(parseInt(data.value))}
          ></Input>
          <Label htmlFor="startHPInput">Max HP: </Label>
          <Input
            type="number"
            id="startHPInput"
            className={styles.inputWidth}
            onChange={(_, data) => setCombatantHP(parseInt(data.value))}
          ></Input>
          <Checkbox
            label={"Player:"}
            labelPosition="before"
            onChange={(_, data) => setcombatantPlayer(data.checked)}
          ></Checkbox>
          <Button
            icon={<AddRegular />}
            onClick={() =>
              setCombatants([
                ...combatcombatants,
                {
                  name: combatantName,
                  initiative: combatantInitiative,
                  dexMod: combatantDexMod,
                  armorClass: combatantAC,
                  startHp: combatantHP,
                  currentHp: combatantHP,
                  pendingDamage: 0,
                  player: combatantPlayer,
                },
              ])
            }
          >
            Add
          </Button>
        </div>
      </>
      <>
        <Table>
          <TableBody>
            {combatcombatants
              .sort((a, b) => {
                if (b.initiative - a.initiative === 0) {
                  if (b.dexMod - a.dexMod === 0) {
                    return a.player === true ? -1 : b.player === true ? 1 : 0;
                  }
                  return b.dexMod - a.dexMod;
                }
                return b.initiative - a.initiative;
              })
              .map((character) => (
                <TableRow
                  style={{
                    alignItems: "center",
                  }}
                >
                  <TableCell>{character.name}</TableCell>
                  <TableCell>AC: {character.armorClass}</TableCell>
                  <TableCell>HP: {character.startHp}</TableCell>
                  <TableCell>Remaining HP: {character.currentHp}</TableCell>
                  <TableCell style={{ display: "flex" }}>
                    <Input
                      type="number"
                      className={styles.inputWidth}
                      placeholder={character.pendingDamage.toString()}
                      onChange={(_, data) => {
                        character.pendingDamage = parseInt(data.value);
                      }}
                    ></Input>
                    <Button
                      onClick={() => {
                        character.currentHp =
                          character.currentHp - character.pendingDamage;
                        setDamage(Math.random());
                      }}
                    >
                      Apply
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        setCombatants(
                          combatcombatants.filter(
                            (c) => c.name !== character.name
                          )
                        )
                      }
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </>
    </>
  );
}

export default App;
