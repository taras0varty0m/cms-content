import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Content } from "src/contents/entities/content.entity";

export default class ContentSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    await factory(Content)()
      .map(async (content: Content) => {
        content.userId = user.id;
        return content;
      })
      .create();
  }
}
