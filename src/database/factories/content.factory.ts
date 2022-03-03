import { Content } from "src/contents/entities/content.entity";
import { define, factory } from "typeorm-seeding";

define(Content, (faker) => {
  const content = new Content();

  content.href = faker.internet.url();

  return content;
});
