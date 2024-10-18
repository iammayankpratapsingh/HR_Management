import express from 'express';
import Employee from '../models/Employee.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/employee_login", async (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email });
        if (!employee) return res.json({ loginStatus: false, Error: "Wrong email or password" });

        const match = await bcrypt.compare(req.body.password, employee.password);
        if (!match) return res.json({ loginStatus: false, Error: "Wrong Password" });

        const token = jwt.sign({ role: "employee", email: employee.email, id: employee._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie('token', token);
        res.json({ loginStatus: true, id: employee._id });
    } catch (err) {
        res.json({ loginStatus: false, Error: "Query error" });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.json({ Status: false, Error: "Employee not found" });
        res.json(employee);
    } catch (err) {
        res.json({ Status: false, Error: "Query error" });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true });
});

export { router as EmployeeRouter };
