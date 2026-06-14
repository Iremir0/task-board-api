import {z} from 'zod'

const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3).optional(),
    status: z.enum(['TODO','IN_PROGRESS','IN_REVIEW','DONE']).default('TODO').optional(),
    priority: z.enum(['LOW','MEDIUM','HIGH']).default('MEDIUM').optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.string().optional()
})

const updateTaskSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(3).optional(),
    status: z.enum(['TODO','IN_PROGRESS','IN_REVIEW','DONE']).optional(),
    priority: z.enum(['LOW','MEDIUM','HIGH']).optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.string().optional()
})

export {createTaskSchema,updateTaskSchema}