const autoIncrement = async (model, data, column) => {
    let total = await model.find().sort({[column]: -1}).limit(1);
    data[`${column}`] = total.length === 0 ? 1 : Number(total[0][`${column}`]) + 1;
};

export default autoIncrement;