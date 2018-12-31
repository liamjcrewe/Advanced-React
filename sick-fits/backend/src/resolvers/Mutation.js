const Mutations = {
  async createItem (parent, args, context, info) {
    // TODO check if user logged in

    const item = await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info)

    return item
  }
}

module.exports = Mutations
