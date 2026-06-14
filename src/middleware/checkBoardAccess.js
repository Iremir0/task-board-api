import { prisma } from '../config/db.js';

const checkBoardAccess = async (req, res, next) => {
    const { id } = req.params;

    const board = await prisma.board.findUnique({
        where: { id },
        include: {
            tasks: true,
            collaborators: {
                include: {
                    user: { select: { id: true, email: true, name: true } }
                }
            }
        }
    });

    if (!board) {
        return res.status(404).json({ status: 'error', message: 'Board was not found' });
    }

    const isCreator = req.user.id === board.createdById;
    const isCollaborator = board.collaborators.some(
        (collaborator) => collaborator.userId === req.user.id
    );

    if (!isCreator && !isCollaborator) {
        return res.status(403).json({ status: 'error', message: 'Access denied' });
    }

    req.board = board;
    next();
};

export default checkBoardAccess;
