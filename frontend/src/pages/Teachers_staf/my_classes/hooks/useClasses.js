import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classesService } from '../services/classes.service';

export const useClasses = (filters) => {
    return useQuery({
        queryKey: ['classes', filters],
        queryFn: () => classesService.getClasses(filters),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useClassDetails = (classId) => {
    return useQuery({
        queryKey: ['class', classId],
        queryFn: () => classesService.getClassById(classId),
        enabled: !!classId,
    });
};

export const useMarkAttendance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ classId, data }) => classesService.markAttendance(classId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['classes']);
        },
    });
};
