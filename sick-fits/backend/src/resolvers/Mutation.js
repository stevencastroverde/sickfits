const Mutation = {
    async createItem(parent, args, ctx, info) {
        //@todo check if user is logged in
        const item =  await ctx.db.mutation.createItem({
            data: {
                ...args
            } 
        }, info);
        return item;
    }
   
};

module.exports = Mutation;
