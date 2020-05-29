const autoIncrement = async (model, data, column, next) => {
    // Only applies to new documents, so updating with model.save() method won't update id
    // We search for the biggest id into the documents (will search in the model, not whole db
    // We limit the search to one result, in descendant order.
    if(data.isNew) {
        let total = await model.find().sort({[column]: -1}).limit(1);
        data[`${column}`] = total.length === 0 ? 1 : Number(total[0][`${column}`]) + 1;
        next();
    };
};

export default autoIncrement;