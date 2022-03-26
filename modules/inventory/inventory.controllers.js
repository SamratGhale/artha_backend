const InventorymentModel = require("./inventory.model");
const DataUtils = require("../../helpers/data");
const parse = require('mongoose-parse');

const Inventory= {
  async add(data) {
    try{
      const res = await InventorymentModel.create(data);
      return res;
    }catch(err){
      throw {message:"Could't add the item please try again", code:400};
    }
  },
  async list(start, limit, from) {
    const $match = { is_archived: false };
    if (from) $match.from = { $regex: new RegExp(`${from}`), $options: "gi" };
    const query = [{ $match }];

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: InventorymentModel,
      query,
    });
  },
  async getById(_id) {
    const ret = await InventorymentModel.findOne({ _id, is_archived: false });
    const dis_amount = ret.item_price * (ret.discount / 100);
    ret.new_price = ret.item_price - dis_amount;
    return ret;
  },
  async update(id, data) {
    const item = await InventorymentModel.findById(id);
    if (!item) {
      throw { message: "Item not found", code: 4000 };
    } else {
      return await InventorymentModel.findByIdAndUpdate(id, data);
    }
  },
  async archive(id) {
    return InventorymentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },
  async decreaseItem(id, qty) {
    const item = await this.getById(id);
    console.log(qty);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else if (item.quantity < qty) {
      throw { message: "Not enought item", code: 400 };
    } else {
      item.quantity = item.quantity -  qty;
      return await this.update(id, item);
    }
  },
  async increaseItem(id, qty) {
    const item = await this.getById(id);
    console.log(qty);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else {
      item.quantity = item.quantity +  qty;
      return await this.update(id, item);
    }
  },
};

module.exports = {
  Inventory,
  register: (req) => Inventory.add(req.payload),
  list: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    return Inventory.list(start, limit, from);
  },
  decreaseItem: (req) => {
    return Inventory.decreaseItem(req.params.id, req.payload.qty);
  },
  increaseItem: (req) => {
    return Inventory.increaseItem(req.params.id, req.payload.qty);
  },
  update: (req) => {
    return Inventory.update(req.params.id, req.payload);
  },
  getById: (req) => Inventory.getById(req.params.id),
  archive: (req) => Inventory.archive(req.params.id),
};
