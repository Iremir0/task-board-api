import { prisma } from '../config/db.js';

const checkBoardAndOwnership = async (req, res, next) => {
    const { id } = req.params;

    const board = await prisma.board.findUnique({ where: { id } });

    if (!board) {
        return res.status(404).json({ status: 'error', message: 'Board not found' });
    }

    if (board.createdById !== req.user.id) {
        return res.status(403).json({ status: 'error', message: 'Access denied' });
    }

    // Attach board to request so the controller doesn't need to fetch it again
    req.board = board;
    next();
};

export default checkBoardAndOwnership;