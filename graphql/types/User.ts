import { enumType, objectType } from "nexus";
import { Link } from "./Link";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("email");
    t.string("image");
    t.field("role", { type: Role });
    t.list.field("bookmarks", {
      type: Link,
      async resolve(parent, _args, context) {
        return await context.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .bookmarks();
      },
    });
  },
});

const Role = enumType({
  name: "Roles",
  members: ["ADMIN", "USER"],
});
