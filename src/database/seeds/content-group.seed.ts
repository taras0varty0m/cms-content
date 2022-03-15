import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { ContentGroup } from "src/content-group/entities/content-group.entity";

export default class ContentGroupSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    await factory(ContentGroup)()
      .map(async (contentGroup: ContentGroup) => {
        contentGroup.userId = user.id;
        return contentGroup;
      })
      .create();
  }
}
