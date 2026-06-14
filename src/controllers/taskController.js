import {prisma} from '../config/db.js'

//Get one task

const getTask = async (req,res) => {
    const {id} = req.params

    try {
        return res.status(200).json({status:'success',message:'Task returned',data: req.task})

    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

//Update task

const updateTask = async (req,res) => {
    const {title,description,status,priority,dueDate,assigneeId} = req.body 
    
    try {
        const task = await prisma.task.update({
            where: {id: req.task.id},
            data:{
                title,
                description,
                status,
                priority,
                dueDate,
                assigneeId
            }
        }) 
        return res.status(200).json({status:'success',message:'Task is updated', data: task})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

//Delete task

const deleteTask = async (req,res) => { 
    try {
        const task = await prisma.task.delete({where: {id: req.task.id}})
        return res.status(200).json({status:'success',message:'Task is deleted', data: task})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

export {getTask,updateTask,deleteTask}