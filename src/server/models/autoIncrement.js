const autoIncrement = async (model, data, column) => {
    console.log('#### auto increment ####');
    let total = await model.find().sort({[column]: -1}).limit(1);
    console.log(total);
    data[`${column}`] = total.length === 0 ? 1 : Number(total[0][`${column}`]) + 1;
    console.log(data[`${column}`]);
};

export default autoIncrement;