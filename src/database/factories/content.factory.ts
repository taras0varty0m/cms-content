import { Content } from "src/contents/entities/content.entity";
import { define } from "typeorm-seeding";

define(Content, (faker) => {
  const content = new Content();
  content.href = faker.random.words(1);
  content.fileKey = faker.random.words(1);
  return content;
});
