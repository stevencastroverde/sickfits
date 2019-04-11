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
    },
   async deleteItem(parent, args, ctx, info) {
       const where = { id: args.id };
       //find item
        const item = await ctx.db.query.item({where}, `{ id title}`)
        //see if owner/has permission do delete
        // @todo
        //delete it
        return ctx.db.mutation.deleteItem({ where }, info)
    }
   
};

module.exports = Mutation;
