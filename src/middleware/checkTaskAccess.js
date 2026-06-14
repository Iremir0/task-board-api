import {prisma} from '../config/db.js'

const checkTaskAccess = async (req,res,next) => {
const {id} = req.params
    const task = await prisma.task.findUnique({
        where: {id},
        include:{
            board: {
                include: {
                    collaborators:true
                }
            }
        }
    })

    if(!task) return res.status(404).json({status:'error',message:'Task was not found'})

    const isBoardCreator = task.board.createdById === req.user.id;
    const isCollaborator = task.board.collaborators.some((col) => col.userId === req.user.id)

    if (!isBoardCreator && !isCollaborator) return res.status(403).json({status:'error',message:'Access denied'})
    
    req.task = task;
    next()
}

export default checkTaskAccess