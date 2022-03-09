import { Screen } from "src/screens/entities/screen.entity";
import { define } from "typeorm-seeding";

define(Screen, () => {
  const screen = new Screen();
  return screen;
});
