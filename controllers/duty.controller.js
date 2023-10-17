const duty = require('../services/duty.service');

class dutyController {
    static create = async (req,res,next) => {
        try{
            const duty = await duty.create(req.body);
            res.status(200).json({
                status:true,
                message: 'Duty created successfully',
                data: duty
            });
        }
        catch(e){
            const error = new Error(e.message);
            error.status = e.statuscode || 500;
            next(error);
        }
    }
    static duties = async (req, res, next) => {
        try {
            const duties = await duty.duties(req.body);
            res.status(200).json({
                status: true,
                message: 'Duties',
                data: duties
            });
        } catch (e) {
            const error = new Error(e.message);
            error.status = e.statusCode || 500;
            next(error);
        }
    }
}

module.exports = dutyController;