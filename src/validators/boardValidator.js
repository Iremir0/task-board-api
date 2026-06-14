import {z} from 'zod'

const createBoardSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional()
});

const updateBoardSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional()
});

const addCollaboratorSchema = z.object({
    email: z.string().email()
});

export {createBoardSchema,updateBoardSchema,addCollaboratorSchema}