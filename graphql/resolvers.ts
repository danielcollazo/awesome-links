export const resolvers = {
  Query: {
    links: async (_parent, _args, context) =>
      await context.prisma.link.findMany(),
  },
};
