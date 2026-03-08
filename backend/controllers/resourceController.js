import Resource from '../models/Resource.js';
import Teacher from '../models/Teacher.js';
import Department from '../models/Department.js';
import Subject from '../models/Subject.js';
import User from '../models/User.js';
import path from 'path';
import fs from 'fs';

// Upload Resource (Teacher)
export const uploadResource = async (req, res) => {
    try {
        console.log('=== Upload Resource Called ===');
        console.log('req.user:', req.user);
        console.log('req.headers.authorization:', req.headers.authorization);

        const { title, description, departmentId, year, semester, subjectId } = req.body;

        if (!req.user) {
            console.log('ERROR: req.user is undefined!');
            return res.status(401).json({ message: 'Not authorized' });
        }

        const userId = req.user.id;
        console.log('userId from req.user:', userId);

        if (!title || !departmentId || !year) {
            return res.status(400).json({ message: 'Title, department, and year are required' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Get teacher record from userId
        const teacher = await Teacher.findOne({ where: { userId } });
        console.log('Teacher found:', teacher ? teacher.id : 'NULL');

        if (!teacher) {
            console.log(`Cannot upload: No Teacher record found for userId: ${userId}`);
            return res.status(404).json({
                message: 'Teacher profile not found. Please contact administrator.'
            });
        }

        // Determine file type from extension
        const ext = path.extname(req.file.originalname).toLowerCase();
        let fileType = 'other';
        if (['.pdf'].includes(ext)) fileType = 'pdf';
        else if (['.doc', '.docx'].includes(ext)) fileType = 'doc';
        else if (['.ppt', '.pptx'].includes(ext)) fileType = 'ppt';
        else if (['.mp4', '.avi', '.mkv'].includes(ext)) fileType = 'video';

        const resource = await Resource.create({
            title,
            description,
            fileUrl: `/uploads/resources/${req.file.filename}`,
            fileName: req.file.originalname,
            fileType,
            fileSize: req.file.size,
            departmentId,
            year: parseInt(year),
            semester: semester ? parseInt(semester) : null,
            subjectId: subjectId || null,
            uploadedBy: teacher.id,
        });

        res.status(201).json({
            message: 'Resource uploaded successfully',
            resource
        });
    } catch (error) {
        console.error('Error uploading resource:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Resources for Teacher (uploaded by them)
export const getTeacherResources = async (req, res) => {
    try {
        const userId = req.user.id;

        const teacher = await Teacher.findOne({ where: { userId } });
        if (!teacher) {
            console.log(`No Teacher record found for userId: ${userId}`);
            // Return empty array instead of error for better UX
            return res.json([]);
        }

        const resources = await Resource.findAll({
            where: { uploadedBy: teacher.id },
            include: [
                { model: Department, as: 'department', attributes: ['id', 'name'] },
                { model: Subject, as: 'subject', attributes: ['id', 'name'] },
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(resources);
    } catch (error) {
        console.error('Error fetching teacher resources:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Resources for Student (filtered by their dept/year)
export const getStudentResources = async (req, res) => {
    try {
        const userId = req.user.id;
        const { semester, subjectId } = req.query;

        // Get student data
        const student = await User.findByPk(userId);
        if (!student || student.role !== 'student') {
            return res.status(403).json({ message: 'Access denied' });
        }

        let whereClause = {
            departmentId: student.departmentId,
            year: student.year,
        };

        // Optional filters
        if (semester) {
            whereClause.semester = [null, parseInt(semester)]; // Include null (all semesters) and specific
        }
        if (subjectId) {
            whereClause.subjectId = [null, subjectId]; // Include null (general) and specific
        }

        const resources = await Resource.findAll({
            where: whereClause,
            include: [
                { model: Department, as: 'department', attributes: ['id', 'name'] },
                { model: Subject, as: 'subject', attributes: ['id', 'name'] },
                {
                    model: Teacher,
                    as: 'uploader',
                    include: [{ model: User, attributes: ['name'] }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(resources);
    } catch (error) {
        console.error('Error fetching student resources:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Resource (only uploader can update)
export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, departmentId, year, semester, subjectId } = req.body;
        const userId = req.user.id;

        const teacher = await Teacher.findOne({ where: { userId } });
        const resource = await Resource.findByPk(id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.uploadedBy !== teacher.id) {
            return res.status(403).json({ message: 'You can only update your own resources' });
        }

        await resource.update({
            title: title || resource.title,
            description: description !== undefined ? description : resource.description,
            departmentId: departmentId || resource.departmentId,
            year: year ? parseInt(year) : resource.year,
            semester: semester !== undefined ? (semester ? parseInt(semester) : null) : resource.semester,
            subjectId: subjectId !== undefined ? subjectId : resource.subjectId,
        });

        res.json({ message: 'Resource updated successfully', resource });
    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Resource (only uploader can delete)
export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const teacher = await Teacher.findOne({ where: { userId } });
        const resource = await Resource.findByPk(id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.uploadedBy !== teacher.id) {
            return res.status(403).json({ message: 'You can only delete your own resources' });
        }

        // Delete file from filesystem
        const filePath = path.join(process.cwd(), resource.fileUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await resource.destroy();
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Download/View Resource (increments download counter)
export const downloadResource = async (req, res) => {
    try {
        const { id } = req.params;

        const resource = await Resource.findByPk(id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Increment downloads
        await resource.increment('downloads');

        // Send file
        const filePath = path.join(process.cwd(), resource.fileUrl);
        if (fs.existsSync(filePath)) {
            res.download(filePath, resource.fileName);
        } else {
            res.status(404).json({ message: 'File not found on server' });
        }
    } catch (error) {
        console.error('Error downloading resource:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
