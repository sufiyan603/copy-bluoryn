import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Mock Data for Institute
  const institute = await prisma.institute.create({
    data: {
      institute_name: "Vellore Institute of Technology",
      about: "VIT is one of India's leading private engineering institutions known for its research-driven approach and global rankings.",
      address: "Katpadi Road",
      city: "Vellore",
      state: "Tamil Nadu",
      pincode: "632014",
      latitude: 12.9692,
      longitude: 79.1559,
      establishment_year: 1984,
      institute_type: "Private University",
      campus_size: "360 acres",
      student_intake: 25000,
      affiliation: "UGC, AICTE, NAAC",
      last_updated_on: new Date(),
      last_updated_from: "seed script",
      contact_email: "admissions@vit.ac.in",
      contact_phone: "0416-2202020",
      website: "https://vit.ac.in",
      accreditation: "NAAC A++",
      institution_type: "Deemed University",
      url: "https://www.shiksha.com/university/vit-university-vellore-3",
    },
  });

  // Mock Data for Courses
  const course1 = await prisma.course.create({
    data: {
      institute_id: institute.institute_id,
      name: "B.Tech in Computer Science and Engineering",
      description: "Industry-focused program with specializations in AI, ML, and Cloud Computing",
      duration: "4 years",
      level: "Undergraduate",
      mode: "Full-Time",
      specialization: "Computer Science",
      eligibility: "VITEEE qualified",
    },
  });

  const course2 = await prisma.course.create({
    data: {
      institute_id: institute.institute_id,
      name: "B.Tech in Mechanical Engineering",
      description: "Comprehensive program with focus on Industry 4.0 and automation",
      duration: "4 years",
      level: "Undergraduate",
      mode: "Full-Time",
      specialization: "Mechanical Engineering",
      eligibility: "VITEEE qualified",
    },
  });

  // Mock Data for Fees
  await prisma.fee.createMany({
    data: [
      {
        course_id: course1.course_id,
        min_fee: 225000,
        max_fee: 280000,
        fee_year: 2024,
        component: "Tuition Fee",
        amount: 225000,
        currency: "INR",
      },
      {
        course_id: course2.course_id,
        min_fee: 200000,
        max_fee: 250000,
        fee_year: 2024,
        component: "Tuition Fee",
        amount: 200000,
        currency: "INR",
      },
    ],
  });

  // Mock Data for Reviews
  await prisma.review.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        verified_reviews: 12500,
        placements_rating: 4.6,
        infrastructure_rating: 4.7,
        faculty_rating: 4.4,
        course_curriculum_rating: 4.5,
        campus_life_rating: 4.8,
        value_for_money_rating: 4.3,
        review_text: "Excellent infrastructure and international exposure",
        reviewer_name: "Anonymous",
        reviewer_email: "anonymous@example.com",
        review_date: new Date(),
      },
      {
        institute_id: institute.institute_id,
        verified_reviews: 8900,
        placements_rating: 4.5,
        infrastructure_rating: 4.6,
        faculty_rating: 4.3,
        course_curriculum_rating: 4.4,
        campus_life_rating: 4.7,
        value_for_money_rating: 4.2,
        review_text: "Great campus life and industry connections",
        reviewer_name: "Rahul Kumar",
        reviewer_email: "rahul@example.com",
        review_date: new Date(),
      },
    ],
  });
  
 /// departments 

   const department1 = await prisma.department.create({
    data: {
      institute_id: institute.institute_id,
      name: "School of Computer Science and Engineering",
      head: "Dr. S. Ramachandran",
    },
  });

  const department2 = await prisma.department.create({
    data: {
      institute_id: institute.institute_id,
      name: "School of Mechanical Engineering",
      head: "Dr. V. Krishna",
    },
  });
  // Mock Data for Companies
  const company = await prisma.company.create({
    data: {
      company_name: "Amazon",
      industry: "Technology",
      location: "Bangalore, India",
      contact_email: "university-recruiting@amazon.com",
      contact_phone: "+91-8066534000",
    },
  });


  // Mock Data for Placements
  const placement = await prisma.placement.create({
    data: {
      institute_id: institute.institute_id,
      company_id: company.company_id,
      year: 2023,
      top_recruiters: "Amazon, TCS, Infosys, IBM",
      placement_rate: 94.5,
      offer_status: "Ongoing",
    },
  });

  // Mock Data for Placement Specialization Stats
  await prisma.placementSpecializationStats.createMany({
    data: [
      {
        placement_id: placement.placement_id,
        specialization: "Computer Science",
        average_package: 1200000,
        median_package: 1000000,
        highest_package: 45000000,
      },
      {
        placement_id: placement.placement_id,
        specialization: "Mechanical Engineering",
        average_package: 800000,
        median_package: 750000,
        highest_package: 25000000,
      },
    ],
  });

  // Mock Data for Faculty
  const faculty1 = await prisma.faculty.create({
    data: {
      institute_id: institute.institute_id,
      name: "Dr. S. Ramachandran",
      designation: "Professor",
      subject_expertise: "Data Science",
      rating: 4.7,
      tenure_start: new Date("2008-06-15"),
      department_id: department1.department_id,
      
    },
  });

  const faculty2 = await prisma.faculty.create({
    data: {
      institute_id: institute.institute_id,
      name: "Dr. V. Krishna",
      designation: "Associate Professor",
      subject_expertise: "Robotics",
      rating: 4.6,
      tenure_start: new Date("2011-08-20"),
      department_id: department1.department_id,
    },
  });

  // Mock Data for Faculty Publications
  await prisma.facultyPublication.createMany({
    data: [
      {
        faculty_id: faculty1.faculty_id,
        title: "Advanced Data Analytics in IoT Networks",
        journal: "International Journal of Data Science",
        year: 2023,
        doi: "10.1016/j.ds.2023.12345",
      },
      {
        faculty_id: faculty2.faculty_id,
        title: "Robotic Process Automation",
        journal: "Robotics and Automation Letters",
        year: 2024,
        doi: "10.1109/RAL.2024.56789",
      },
    ],
  });

  // Mock Data for Scholarships
  await prisma.scholarship.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        name: "VIT Merit Scholarship",
        eligibility: "Top 100 ranks in VITEEE",
        amount: 175000,
        deadline: new Date("2025-05-30"),
        application_process: "Automatic based on VITEEE rank",
        required_documents: "VITEEE Score Card, Academic Records",
      },
      {
        institute_id: institute.institute_id,
        name: "Sports Excellence Scholarship",
        eligibility: "National level sports achievement",
        amount: 100000,
        deadline: new Date("2025-06-15"),
        application_process: "Apply through sports quota",
        required_documents: "Sports certificates, Achievement proof",
      },
    ],
  });

  // Mock Data for User
  const user = await prisma.user.create({
    data: {
      username: "vit_student",
      email: "student@vit.ac.in",
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
        address: "Katpadi Road",
        city: "Vellore",
        state: "Tamil Nadu",
        pincode: "632014",
        latitude: 12.9692,
        longitude: 79.1559,
        affiliation: "UGC, AICTE, NAAC",
      },
    ],
  });

  // Mock Data for Infrastructure
  await prisma.infrastructure.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        facility: "Central Library",
        library_details: "Digital library with over 200,000 books and online journals",
        facility_rating: 4.7,
        total_reviews: 9500,
        timings: "24/7",
      },
      {
        institute_id: institute.institute_id,
        facility: "Hostel",
        hostel_type: "Mixed",
        hostel_details: "Modern hostels with AC and non-AC options",
        facility_rating: 4.5,
        total_reviews: 8200,
        timings: "24/7",
      },
      {
        institute_id: institute.institute_id,
        facility: "Sports Complex",
        facility_rating: 4.8,
        total_reviews: 7500,
        timings: "5 AM to 10 PM",
      },
    ],
  });

  // Mock Data for Student Clubs
  await prisma.studentClub.createMany({
    data: [
      {
        institute_id: institute.institute_id,
        name: "Microsoft Innovation Lab",
        description: "Technical club in collaboration with Microsoft",
        faculty_advisor: "Dr. S. Ramachandran",
        members_count: 250,
      },
      {
        institute_id: institute.institute_id,
        name: "SAE Club",
        description: "Society of Automotive Engineers student chapter",
        faculty_advisor: "Dr. V. Krishna",
        members_count: 180,
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
        institute_rank: 12,
        category: "Engineering",
        country: "India",
      },
      {
        institute_id: institute.institute_id,
        ranking_body: "QS World",
        ranking_year: 2024,
        institute_rank: 801,
        category: "Global",
        country: "Global",
      },
    ],
  });

  // Mock Data for Admission Quotas
  await prisma.admissionQuota.createMany({
    data: [
      { course_id: course1.course_id, category: "Management", percentage: 60.0 },
      { course_id: course1.course_id, category: "NRI", percentage: 15.0 },
      { course_id: course1.course_id, category: "Sports", percentage: 5.0 },
      { course_id: course1.course_id, category: "Defense", percentage: 5.0 },
      { course_id: course1.course_id, category: "General Merit", percentage: 15.0 },
    ],
  });

  // Mock Data for Cutoffs
  await prisma.cutoff.createMany({
    data: [
      {
        course_id: course1.course_id,
        exam_name: "VITEEE",
        category: "General",
        opening_rank: 1,
        closing_rank: 5000,
        exam_year: 2024,
      },
      {
        course_id: course2.course_id,
        exam_name: "VITEEE",
        category: "General",
        opening_rank: 5001,
        closing_rank: 15000,
        exam_year: 2024,
      },
    ],
  });

  
 

  console.log("Mock data for VIT Vellore has been successfully added to the database.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Error adding mock data:", e);
    process.exit(1);
  });
