import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Event } from "src/events/entities/event.entity";

export default class UserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await factory(User)().create();
    const events = await factory(Event)()
      .map(async (event: Event) => {
        event.userId = user.id;
        return event;
      })
      .createMany(100);
  }
}
