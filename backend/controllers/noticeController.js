import Notice from '../models/Notice.js';
import User from '../models/User.js';

// Create a Notice
export const createNotice = async (req, res) => {
    try {
        const { title, content, category, audience, priority, status } = req.body;
        const postedBy = req.user.id; // From Auth Middleware

        const newNotice = await Notice.create({
            title,
            content,
            category,
            audience,
            priority: priority || 'Normal',
            status: status || 'Published',
            postedBy
        });

        // Fetch with author details to return complete object
        const noticeWithAuthor = await Notice.findByPk(newNotice.id, {
            include: [{ model: User, as: 'author', attributes: ['name', 'role'] }]
        });

        res.status(201).json(noticeWithAuthor);
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(500).json({ message: 'Server error creating notice' });
    }
};

// Get All Notices (with optional filtering)
export const getAllNotices = async (req, res) => {
    try {
        const { audience } = req.query;

        let whereClause = {};
        if (audience) {
            // If querying as Student, show 'Student' AND 'All'
            if (audience === 'Student' || audience === 'student') {
                whereClause.audience = ['Student', 'All'];
            }
            // If querying as Teacher, show 'Teacher' AND 'All'
            else if (audience === 'Teacher' || audience === 'teacher') {
                whereClause.audience = ['Teacher', 'All'];
            }
        }

        const notices = await Notice.findAll({
            where: whereClause,
            include: [
                { model: User, as: 'author', attributes: ['name', 'role'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ message: 'Server error fetching notices' });
    }
};

// Update Notice (Generic update for status, pinned, etc.)
export const updateNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const notice = await Notice.findByPk(id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        await notice.update(updates);

        // Fetch again with author to keep frontend consistent
        const updatedNotice = await Notice.findByPk(id, {
            include: [{ model: User, as: 'author', attributes: ['name', 'role'] }]
        });

        res.json(updatedNotice);
    } catch (error) {
        console.error('Error updating notice:', error);
        res.status(500).json({ message: 'Server error updating notice' });
    }
};

// Delete Notice
export const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const notice = await Notice.findByPk(id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        await notice.destroy();
        res.json({ message: 'Notice deleted successfully' });
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ message: 'Server error deleting notice' });
    }
};
