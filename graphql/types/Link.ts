import { extendType, objectType } from "nexus";
import { User } from "./User";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("description");
    t.string("url");
    t.string("imageUrl");
    t.string("category");
    t.list.field("users", {
      type: User,
      async resolve(parent, _args, context) {
        return await context.prisma.link
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .users();
      },
    });
  },
});

export const LinksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("links", {
      type: Link,
      resolve(_parent, _args, context) {
        return context.prisma.link.findMany();
      },
    });
  },
});
