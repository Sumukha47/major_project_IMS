import Setting from '../models/Setting.js';

// Get all settings or by group
export const getSettings = async (req, res) => {
    try {
        const { group } = req.query;
        let whereClause = {};
        if (group) whereClause.group = group;

        const settings = await Setting.findAll({ where: whereClause });

        // Convert to a nice key-value object for the frontend
        const settingsObj = {};
        settings.forEach(s => {
            settingsObj[s.key] = s.value;
        });

        res.json(settingsObj);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Server error fetching settings' });
    }
};

// Update multiple settings at once (Bulk)
export const updateSettings = async (req, res) => {
    try {
        const { settings, group = 'institution' } = req.body; // settings = { key: value, ... }

        for (const [key, value] of Object.entries(settings)) {
            const [setting, created] = await Setting.findOrCreate({
                where: { key },
                defaults: { value, group }
            });

            if (!created) {
                await setting.update({ value });
            }
        }

        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Server error updating settings' });
    }
};

// Seed default settings if they don't exist
export const seedSettings = async () => {
    const defaults = [
        { key: 'institution_name', value: 'Nagpur Institute of Technology', group: 'institution' },
        { key: 'institution_address', value: 'Survey No. 13/2, Mahurzari, Katol Road, Nagpur - 441501', group: 'institution' },
        { key: 'institution_email', value: 'info@nit.edu.in', group: 'institution' },
        { key: 'institution_website', value: 'www.nit.edu.in', group: 'institution' },
        { key: 'notification_emailAlerts', value: true, group: 'notifications' },
        { key: 'notification_smsAlerts', value: false, group: 'notifications' },
        { key: 'notification_newsletter', value: true, group: 'notifications' },
        { key: 'notification_securityAlerts', value: true, group: 'notifications' },
    ];

    for (const d of defaults) {
        await Setting.findOrCreate({
            where: { key: d.key },
            defaults: d
        });
    }
    console.log('✅ Default settings seeded.');
};
