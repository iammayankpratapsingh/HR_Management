import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salary: { type: Number, required: true },
    address: { type: String, required: true },
    category_id: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model("Employee", EmployeeSchema);
