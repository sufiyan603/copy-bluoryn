import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma'; // Adjust the path to match your project structure

export async function GET() {
  try {
    // Fetch analytics data for all institutes
    const [totalInstitutes, institutesByType, avgStudentIntake, totalCourses, totalStudents, totalFaculty, institutesByState] = await Promise.all([
      // Total number of institutes
      prisma.institute.count(),

      // Number of institutes by type
      prisma.institute.groupBy({
        by: ['institute_type'],
        _count: {
          institute_id: true,
        },
      }),

      // Average student intake across all institutes
      prisma.institute.aggregate({
        _avg: {
          student_intake: true,
        },
      }),

      // Total number of courses
      prisma.course.count(),

      // Total number of students
      prisma.student.count(),

      // Total number of faculty
      prisma.facultyUser.count(),

      // Institutes grouped by state
      prisma.institute.groupBy({
        by: ['state'],
        _count: {
          institute_id: true,
        },
      }),
    ]);

    // Format the response data
    const analyticsData = {
      total_institutes: totalInstitutes,
      institutes_by_type: institutesByType.map((type) => ({
        type: type.institute_type,
        count: type._count.institute_id,
      })),
      average_student_intake: avgStudentIntake._avg.student_intake || 0,
      total_courses: totalCourses,
      total_students: totalStudents,
      total_faculty: totalFaculty,
      institutes_by_state: institutesByState.map((state) => ({
        state: state.state,
        count: state._count.institute_id,
      })),
    };

    // Return the analytics data as JSON
    return NextResponse.json(analyticsData, { status: 200 });
  } catch (error) {
    console.error('Error fetching institute analytics:', error);

    // Return a 500 error in case of unexpected issues
    return NextResponse.json(
      { message: 'An error occurred while fetching analytics data' },
      { status: 500 }
    );
  }
}
