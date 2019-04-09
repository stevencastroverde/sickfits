const Mutation = {
    async createItem(parent, args, ctx, info) {
        //@todo check if user is logged in
        const item =  await ctx.db.mutation.createItem({
            data: {
                ...args
            } 
        }, info);
        return item;
    },
    updateItem(parent, args, ctx, info) {
        const updates = { ...args };
        //delete id from updates so we can pass as data
        delete updates.id;
        //run update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    }
   
};

module.exports = Mutation;
