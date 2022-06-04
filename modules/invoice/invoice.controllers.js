const inventoryModel = require("../inventory/inventory.model");
const InvoiceModel = require("./invoice.model");
const InvoiceItemModel = require("./invoice_items.model")

const Invoice = {
    async add(data) {
        try {
            const res = await InvoiceModel.create(data);
            return res;
        } catch (err) {
            throw { message: "Could't add invoice please try again", code: 400 };
        }
    },

    async list(start, limit, from) {
        const invoice = await InvoiceModel.aggregate(
            [{$lookup:{
                from: "User",
                localField: "staff_id",
                foreignField : "_id",
                as:"staff"
            }},
            {
                $project:{
                    "staff.password":0,
                    "staff.dateOfBirth":0,
                    "staff.is_archived":0,
                    "staff.is_registered":0,
                    "staff.role":0,
                    "staff.created_at":0,
                    "staff.updated_at":0,
                    "staff.__v":0
                }
            }]
        )
        return invoice;
    },

    async getById(_id) {
        const invoice = await InvoiceModel.findOne({ _id, is_archived: false }).lean();
        const items = await InvoiceItemModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: ['$invoice_id', { $toObjectId: _id },
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "inventory",
                    localField: "item_id",
                    foreignField: "_id",
                    as: "item"
                }
            },
        ]);        
        console.log(items)
        invoice.items= items;
        return invoice;
    },

    async addItem(_id, data) {
        const invoice = await InvoiceModel.findOne({ _id, is_archived: false });
        const item = await inventoryModel.findOne({ _id: data.item_id, is_archived: false });
        if (!invoice) {
            throw { message: `There is no invoice witht id = ${_id}`, code: 400 };
        }
        if (!item) {
            throw { message: `There is no item witht id = ${data.item_id}`, code: 400 };
        }
        let total = data.cartQuantity * item.item_price;
        total -= total * item.discount / 100;
        total += total * item.vat / 100;

        data.total = total;
        data.invoice_id = _id;
        const item_inv = await InvoiceItemModel.findOne({ invoice_id: _id, item_id: data.item_id, is_archived: false });
        if (item_inv) {
            data.total += item_inv.total;
            data.cartQuantity += item_inv.cartQuantity;
            try {
                return await InvoiceItemModel.findOneAndUpdate({ invoice_id: _id, item_id: data.item_id, is_archived: false }, data);
            } catch {
                throw { message: "Couln't add the item to inventory please try again", code: 400 };
            }
        }

        try {
            const res = await InvoiceItemModel.create(data);
            return res;
        } catch (err) {
            throw { message: "Couln't add the item to inventory please try again", code: 400 };
        }
    },

    async update(id, data) {
        const item = await InvoiceModel.findById(id);
        if (!item) {
            throw { message: "Item not found", code: 4000 };
        } else {
            return await InvoiceModel.findByIdAndUpdate(id, data);
        }
    },

    async archive(id) {
        return Invoice.findOneAndUpdate(
            { _id: id, is_archived: false },
            { is_archived: true }
        );
    },


};

module.exports = {
    Invoice,
    add: (req) => Invoice.add(req.payload),
    list: (req) => {
        const start = req.query.start || 0;
        const limit = req.query.limit || 20;
        const from = req.query.from || null;
        return Invoice.list(start, limit, from);
    },
    update: (req) => {
        return Invoice.update(req.params.id, req.payload);
    },
    getById: (req) => Invoice.getById(req.params.id),
    addItem: (req) => Invoice.addItem(req.params.invoice_id, req.payload),
    archive: (req) => Invoice.archive(req.params.id),
};