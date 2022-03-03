import { Event } from "src/events/entities/event.entity";
import { User } from "src/users/entities/user.entity";
import { define, factory } from "typeorm-seeding";

define(Event, (faker) => {
  const event = new Event();
  event.user = factory(User)() as any;
  event.title = faker.random.words(1);
  return event;
});
