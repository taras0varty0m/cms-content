import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Event } from "src/events/entities/event.entity";

export default class EventSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    await factory(Event)()
      .map(async (event: Event) => {
        event.userId = user.id;
        return event;
      })
      .create();
  }
}
