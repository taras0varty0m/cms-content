import { Event } from "src/events/entities/event.entity";
import { define } from "typeorm-seeding";

define(Event, (faker) => {
  const event = new Event();
  event.title = faker.random.words(1);
  return event;
});
