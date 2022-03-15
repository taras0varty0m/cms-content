import { ContentGroup } from "src/content-group/entities/content-group.entity";
import { define } from "typeorm-seeding";

define(ContentGroup, (faker) => {
  const contentGroup = new ContentGroup();
  contentGroup.type = faker.random.words(1);
  return contentGroup;
});
