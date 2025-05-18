import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    orders: [
        {
            order_date: {
                type: String,
                required: true
            },
            order_data: [
                {
                    name: String,
                    size: String,
                    quantity: Number,
                    price: Number,
                    totalPrice: Number,
                    img: String,
                    desc: String
                }
            ]
        }
    ]
});

const Order = mongoose.model('Order', ordersSchema);

export default Order;
