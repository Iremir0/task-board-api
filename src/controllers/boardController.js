import {prisma} from '../config/db.js'

const createBoard = async (req,res) => {
    const {name, description} = req.body

    try {
        const board = await prisma.board.create({
            data: {
                name,
                description,
                createdById: req.user.id
            }
        });
        return res.status(201).json({status:'success',message:'Board is created', data:board})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})
    }
}

const getBoards = async (req,res) => {
    try {
        const boards = await prisma.board.findMany({
            where: {
                OR: [
                    {createdById: req.user.id},
                    {collaborators: {some: {userId: req.user.id}}}
                ]
            }
        })
        return res.status(200).json({status:'success',message:'User boards returned',data:boards})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

const getBoardById = async (req,res) =>{
    const {id} = req.params
    try {
        const board = await prisma.board.findUnique({
            where: {id},
            include: {
                tasks: true,
                collaborators: {
                    include:{
                        user: {select: {id: true, email: true, name: true}}
                    }
                }
            }
        })

        if(!board) return res.status(404).json({status:'error', message:'Board was not found'});
        
        const isCreator = req.user.id === board.createdById;
        const isCollaborator = board.collaborators.some(c => c.userId === req.user.id)

        if (!isCreator && !isCollaborator) return res.status(403).json({status: 'error', message:'Access denied'});
        
        return res.status(200).json({status:'success',message:'Board received',data:board})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

const updateBoard = async (req,res) => {
    const {id} = req.params
    const {name, description} = req.body
    const board = req.board
    try {
        const updatedBoard = await prisma.board.update(
            {
                where: {id},
                data: {name,description}
            },
        );
        return res.status(200).json({status:'success',message:'Board updated',data:updatedBoard})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}
const deleteBoard = async (req,res) => {
    const {id} = req.params
    try {
        const deletedBoard = await prisma.board.delete({where: {id}});

        return res.status(200).json({status:'success',message:'Board deleted',data:deletedBoard})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})    
    }
}
const addCollaborator = async (req,res) => {
    const {id}= req.params
    const {email} = req.body
    const board = req.board
    try {
        const userToAdd = await prisma.user.findUnique({ where: { email } });
        if (!userToAdd) return res.status(404).json({ message: 'User not found' });

        const collaborator = await prisma.boardCollaborator.create({
            data:{
                userId: userToAdd.id,
                boardId: board.id,
            }
        })

        return res.status(200).json({status:'success',message:'Collaborator added',data:collaborator})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})    
    }
}

//Get all tasks
const getTasks = async (req,res) => {
    const {id} = req.params
    try {
        const board = await prisma.board.findUnique({
            where: {id},
            include: {
                tasks: true,
                collaborators: {
                    include:{
                        user: {select: {id: true, email: true, name: true}}
                    }
                }
            }
        })

        if(!board) return res.status(404).json({status:'error', message:'Board was not found'});
        
        const isCreator = req.user.id === board.createdById;
        const isCollaborator = board.collaborators.some(c => c.userId === req.user.id)

        if (!isCreator && !isCollaborator) return res.status(403).json({status: 'error', message:'Access denied'});

        return res.status(200).json({status:'success',message:'Tasks returned',data:board.tasks})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

const createTask = async (req,res) => {
    const {title,description,status,priority,dueDate,assigneeId} = req.body
    const {id} = req.params
    
    try {
        const task = await prisma.task.create({
            data:{
                title,
                description,
                status,
                priority,
                dueDate,
                board: {
                    connect: {id}
                },
                creator: {
                    connect: {id: req.user.id}
                },
                ...(assigneeId && {
                    assignee: {
                        connect: { id: assigneeId }
                    }
                })
            }
        })
        return res.status(201).json({status:'success',message:'Task is created', data: task})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error',message:'Internal server error'})       
    }
}

export {createBoard, getBoards, getBoardById, updateBoard, deleteBoard, addCollaborator, getTasks, createTask}