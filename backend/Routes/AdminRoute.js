import express from "express";
import Admin from '../models/Admin.js';
import Employee from '../models/Employee.js';
import Category from '../models/Category.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";

const router = express.Router();

// Admin Login Route
router.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add Admin Route
router.post('/add_admin', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin added successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get Categories Route
router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ Status: true, Result: categories });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Add Category Route
router.post('/add_category', async (req, res) => {
    try {
        const newCategory = new Category({ name: req.body.category });
        await newCategory.save();
        res.json({ Status: true });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Add Employee Route
router.post('/add_employee', upload.single('image'), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newEmployee = new Employee({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            salary: req.body.salary,
            image: req.file.filename,
            category_id: req.body.category_id
        });

        await newEmployee.save();
        res.json({ Status: true });
    } catch (err) {
        res.json({ Status: false, Error: err });
    }
});

// Get Employees Route
router.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json({ Status: true, Result: employees });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Get Employee by ID Route
router.get('/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.json({ Status: false, Error: "Employee not found" });
        res.json({ Status: true, Result: employee });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Edit Employee Route
router.put('/edit_employee/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                salary: req.body.salary,
                address: req.body.address,
                category_id: req.body.category_id
            },
            { new: true }
        );

        if (!updatedEmployee) return res.json({ Status: false, Error: "Employee not found" });

        res.json({ Status: true, Result: updatedEmployee });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Delete Employee Route
router.delete('/delete_employee/:id', async (req, res) => {
    try {
        const result = await Employee.findByIdAndDelete(req.params.id);
        if (!result) return res.json({ Status: false, Error: "Employee not found" });
        res.json({ Status: true });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Count Admins Route
router.get('/admin_count', async (req, res) => {
    try {
        const count = await Admin.countDocuments();
        res.json({ Status: true, Result: { admin: count } });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Count Employees Route
router.get('/employee_count', async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        res.json({ Status: true, Result: { employee: count } });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Calculate Total Salary Route
router.get('/salary_count', async (req, res) => {
    try {
        const totalSalary = await Employee.aggregate([{ $group: { _id: null, total: { $sum: "$salary" } } }]);
        res.json({ Status: true, Result: { salaryOFEmp: totalSalary[0].total } });
    } catch (err) {
        res.json({ Status: false, Error: "Query Error" });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true });
});

export { router as adminRouter };
