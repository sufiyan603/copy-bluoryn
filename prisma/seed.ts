import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Mock Data for Institute
  const institute = await prisma.institute.create({
    data: {
      institute_name: "Indian Institute of Technology Bombay",
      about: "IIT Bombay is one of India's premier engineering and research institutions, established in 1958.",
      address: "Powai",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400076",
      latitude: 19.0760,
      longitude: 72.8777,
      establishment_year: 1958,
      institute_type: "Public Institution",
      campus_size: "550 acres",
      student_intake: 11000,
      affiliation: "UGC, AICTE, NBA",
      last_updated_on: new Date(),
      last_updated_from: "seed script",
      contact_email: "info@iitb.ac.in",
      contact_phone: "022-25722545",
      website: "https://www.iitb.ac.in",
      accreditation: "NAAC A++",
      institution_type: "Institute of National Importance",
      url: "https://www.shiksha.com/college/iit-bombay-powai-mumbai-3023",
    },
  });
 

  // Mock Data for Courses
  const course1 = await prisma.course.create({
    data: {
      institute_id: institute.institute_id,
      name: "B.Tech in Computer Science and Engineering",
      description: "Premier undergraduate program in computer science and engineering with focus on research and innovation.",
      duration: "4 years",
      level: "Undergraduate",
      mode: "Full-Time",
      specialization: "Computer Science",
      eligibility: "JEE Advanced qualified",
    },
  });

  const course2 = await prisma.course.create({
    data: {
      institute_id: institute.institute_id,
      name: "B.Tech in Electrical Engineering",
      description: "Comprehensive program covering modern electrical engineering concepts and applications.",
      duration: "4 years",
      level: "Undergraduate",
      mode: "Full-Time",
      specialization: "Electrical Engineering",
      eligibility: "JEE Advanced qualified",
    },
  });

  // Mock Data for Fees
  await prisma.fee.createMany({
    data: [
      {
        course_id: course1.course_id,
        min_fee: 65000,
        max_fee: 200000,
        fee_year: 2024,
        component: "Tuition Fee",
        amount: 65000,
        currency: "INR",
      },
      {
        course_id: course2.course_id,
        min_fee: 65000,
        max_fee: 200000,
        fee_year: 2024,
        component: "Tuition Fee",
        amount: 65000,
        currency: "INR",
      },
    ],
  });

  // Mock Data for Reviews
  await prisma.review.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        verified_reviews: 8750,
        placements_rating: 4.9,
        infrastructure_rating: 4.7,
        faculty_rating: 4.8,
        course_curriculum_rating: 4.8,
        campus_life_rating: 4.6,
        value_for_money_rating: 4.7,
        review_text: "World-class education and research facilities",
        reviewer_name: "Anonymous",
        reviewer_email: "anonymous@example.com",
        review_date: new Date(),
      },
      {
        institute_id: institute.institute_id,
        verified_reviews: 5200,
        placements_rating: 4.8,
        infrastructure_rating: 4.6,
        faculty_rating: 4.9,
        course_curriculum_rating: 4.7,
        campus_life_rating: 4.5,
        value_for_money_rating: 4.8,
        review_text: "Excellent research opportunities and faculty",
        reviewer_name: "John Doe",
        reviewer_email: "john@example.com",
        review_date: new Date(),
      },
    ],
  });

  //mock up data for departments
  const departments = await prisma.department.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        name: "Computer Science and Engineering",
        head: "Dr. P. Kumar",
        description: "Department of Computer Science and Engineering",
      },
      {
        institute_id: institute.institute_id,
        name: "Electrical Engineering",
        head: "Dr. M. Patel",
        description: "Department of Electrical Engineering",
      },
    ],
  });

  // Retrieve the created departments
  const computerScienceDept = await prisma.department.findFirst({
    where: {
      name: "Computer Science and Engineering",
      institute_id: institute.institute_id,
    },
  });

  const electricalEngineeringDept = await prisma.department.findFirst({
    where: {
      name: "Electrical Engineering",
      institute_id: institute.institute_id,
    },
  });

  if (!computerScienceDept || !electricalEngineeringDept) {
    throw new Error("Departments not found!");
  }
    // Mock Data for Companies
    const company = await prisma.company.create({
      data: {
        company_name: "Google",
        industry: "Technology",
        location: "Bangalore, India",
        contact_email: "careers@google.com",
        contact_phone: "+91-8066841000",
      },
    });

  // Mock Data for Placement with Company
  const placement = await prisma.placement.create({
    data: {
      institute_id: institute.institute_id,
      company_id: company.company_id,
      year: 2023,
      top_recruiters: "Google, Microsoft, Apple, Goldman Sachs",
      placement_rate: 98.2,
      offer_status: "Completed",
    },
  });

  // Mock Data for Placement Specialization Stats
  await prisma.placementSpecializationStats.createMany({
    data: [
      {
        placement_id: placement.placement_id,
        specialization: "Computer Science",
        average_package: 2500000,
        median_package: 2200000,
        highest_package: 67000000,
      },
      {
        placement_id: placement.placement_id,
        specialization: "Electrical Engineering",
        average_package: 1800000,
        median_package: 1600000,
        highest_package: 45000000,
      },
    ],
  });

  // Mock Data for Faculty
  const faculty1 = await prisma.faculty.create({
    data: {
      institute_id: institute.institute_id,
      name: "Dr. P. Kumar",
      designation: "Professor",
      subject_expertise: "Machine Learning",
      rating: 4.9,
      tenure_start: new Date("2010-01-01"),
      employment_type: "Full-Time",
      department_id: computerScienceDept.department_id, // Use the valid department_id
    },
  });

  const faculty2 = await prisma.faculty.create({
    data: {
      institute_id: institute.institute_id,
      name: "Dr. M. Patel",
      designation: "Professor",
      subject_expertise: "VLSI Design",
      rating: 4.8,
      tenure_start: new Date("2012-07-15"),
      employment_type: "Full-Time",
      department_id: electricalEngineeringDept.department_id, // Use the valid department_id
    },
  });

  // Mock Data for Faculty Publications
  await prisma.facultyPublication.createMany({
    data: [
      {
        faculty_id: faculty1.faculty_id,
        title: "Deep Learning in Edge Computing",
        journal: "IEEE Transactions on Neural Networks",
        year: 2023,
        doi: "10.1109/TNN.2023.123456",
      },
      {
        faculty_id: faculty2.faculty_id,
        title: "Advanced VLSI Architecture",
        journal: "ACM Transactions",
        year: 2024,
        doi: "10.1145/987654",
      },
    ],
  });

  // Mock Data for Scholarships
  await prisma.scholarship.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        name: "Merit-cum-Means Scholarship",
        eligibility: "Family income less than 5 lakhs per annum",
        amount: 200000,
        deadline: new Date("2025-06-30"),
        application_process: "Apply through academic portal",
        required_documents: "Income Certificate, Academic Records",
      },
      {
        institute_id: institute.institute_id,
        name: "Institute Merit Scholarship",
        eligibility: "Top 10% students in each program",
        amount: 100000,
        deadline: new Date("2025-07-15"),
        application_process: "Automatic consideration based on CGPA",
        required_documents: "None required",
      },
    ],
  });

  // Mock Data for User
  const user = await prisma.user.create({
    data: {
      username: "iitb_student",
      email: "student@iitb.ac.in",
      user_type: "Student",
      status: "Active",
    },
  });

  // Mock Data for Student
  await prisma.student.create({
    data: {
      user_id: user.user_id,
      institute_id: institute.institute_id,
      course_id: course1.course_id,
      enrollment_year: 2020,
      graduation_year: 2024,
    },
  });


 

  // Mock Data for Approval Bodies
  await prisma.approvalBody.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        name: "UGC",
        contact_email: "ugc@example.com",
        contact_phone: "+91-1123232323",
      },
      {
        institute_id: institute.institute_id,
        name: "AICTE",
        contact_email: "aicte@example.com",
        contact_phone: "+91-1123232324",
      },
    ],
  });

  // Mock Data for Locations
  await prisma.location.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        address: "IIT Area, Powai",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400076",
        latitude: 19.0760,
        longitude: 72.8777,
        affiliation: "UGC, AICTE, NBA",
      },
    ],
  });

  // Mock Data for Infrastructure
  await prisma.infrastructure.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        facility: "Central Library",
        library_details: "Over 300,000 books and subscriptions to major research journals",
        facility_rating: 4.8,
        total_reviews: 7500,
        timings: "24/7",
      },
      {
        institute_id: institute.institute_id,
        facility: "Hostel",
        hostel_type: "Mixed",
        hostel_details: "18 hostels with modern amenities",
        facility_rating: 4.6,
        total_reviews: 6800,
        timings: "24/7",
      },
      {
        institute_id: institute.institute_id,
        facility: "Research Labs",
        facility_rating: 4.9,
        total_reviews: 5200,
        timings: "8 AM to 8 PM",
      },
    ],
  });

  // Mock Data for Student Clubs
  await prisma.studentClub.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        name: "Web and Coding Club",
        description: "Technical club focusing on web development and competitive programming",
        faculty_advisor: "Dr. P. Kumar",
        members_count: 200,
      },
      {
        institute_id: institute.institute_id,
        name: "Electronics Club",
        description: "Club for electronics enthusiasts and robotics projects",
        faculty_advisor: "Dr. M. Patel",
        members_count: 150,
      },
    ],
  });

  // Mock Data for Rankings
  await prisma.ranking.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        ranking_body: "NIRF",
        ranking_year: 2024,
        institute_rank: 3,
        category: "Engineering",
        country: "India",
      },
      {
        institute_id: institute.institute_id,
        ranking_body: "QS World",
        ranking_year: 2024,
        institute_rank: 177,
        category: "Global",
        country: "Global",
      },
    ],
  });

  // Mock Data for Admission Quotas
  await prisma.admissionQuota.createMany({
    data: [
      { course_id: course1.course_id, category: "General", percentage: 40.5 },
      { course_id: course1.course_id, category: "OBC", percentage: 27.0 },
      { course_id: course1.course_id, category: "SC", percentage: 15.0 },
      { course_id: course1.course_id, category: "ST", percentage: 7.5 },
      { course_id: course1.course_id, category: "EWS", percentage: 10.0 },
    ],
  });

  // Mock Data for Cutoffs
  await prisma.cutoff.createMany({
    data: [
      {
        course_id: course1.course_id,
        exam_name: "JEE Advanced",
        category: "General",
        opening_rank: 1,
        closing_rank: 1000,
        exam_year: 2024,
      },
      {
        course_id: course2.course_id,
        exam_name: "JEE Advanced",
        category: "General",
        opening_rank: 1000,
        closing_rank: 2500,
        exam_year: 2024,
      },
    ],
  });



  

  console.log("Mock data for IIT Bombay has been successfully added to the database.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Error adding mock data:", e);
    process.exit(1);
  });
