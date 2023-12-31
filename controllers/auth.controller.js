const auth = require('../services/auth.service');

class authController {
    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            });
        } catch (e) {
            const error = new Error(e.message);
            error.status = e.statusCode || 500;
            next(error);
        }
    }

    static login = async (req, res, next) => {
        try {
            const data = await auth.login(req.body);
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            });
        } catch (e) {
            const error = new Error(e.message);
            error.status = e.statusCode || 500;
            next(error);
        }
    }

    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            });
        } catch (e) {
            const error = new Error(e.message);
            error.status = e.statusCode || 500;
            next(error);
        }
    }
}

module.exports = authController;
