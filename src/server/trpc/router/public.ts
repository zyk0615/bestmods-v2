import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const publicRouter = router({
  getNext: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  addMod: publicProcedure
    .input(
      z.object({
        name: z.string(),
        url: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.mod.create({
          data: {
            name: input.name,
            url: input.url,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  addSource: publicProcedure
    .input(
      z.object({
        name: z.string(),
        url: z.string(),
        icon: z.string().nullable(),
        banner: z.string().nullable(),
        classes: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.source.create({
          data: {
            name: input.name,
            url: input.url,
            icon: input.icon ?? null,
            banner: input.banner ?? null,
            classes: input.classes ?? null,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getAllSources: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.source.findMany();
  }),
  getAllMods: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.mod.findMany();
  }),
});
