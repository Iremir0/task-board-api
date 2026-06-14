import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await prisma.user.findUnique({where: {email} });
        if(userExists){
            return res.status(400).json({status:'error',message:'User already exists'})
        }

        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: encryptedPassword
            }
        })

        generateToken(user.id,res)
        return res.status(201).json({status:'success',message:'User is created'})

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const login = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await prisma.user.findUnique({where: {email} })

        if(!user){
            return res.status(404).json({status:'error',message:'Email or password is incorrect'})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(404).json({status:'error',message:'Email or password is incorrect'})   
        }

        generateToken(user.id,res)
        res.status(200).json({status:'success',message:'User logged in'})   
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const logout = async (req,res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        });

        return res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { register, login, logout };