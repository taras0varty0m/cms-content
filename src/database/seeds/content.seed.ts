import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Content } from "src/contents/entities/content.entity";
import { ContentGroup } from "src/content-group/entities/content-group.entity";

export default class ContentSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const group = await factory(ContentGroup)()
      .map(async (contentGroup: ContentGroup) => {
        contentGroup.userId = user.id;
        return contentGroup;
      })
      .create();

    await factory(Content)()
      .map(async (content: Content) => {
        content.userId = user.id;
        content.groupId = group.id;
        return content;
      })
      .create();
  }
}
