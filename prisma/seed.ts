import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const images = [
  '1562774053-701939374585', '1541339907198-e08756dedf3f', '1523050854058-8df90110c9f1',
  '1592280771190-3e2e4d571952', '1606761568499-6d2451b23c66', '1498243691581-b145c3f54a5a',
  '1525926573880-97cc1899146f', '1564981797816-1fa8cb54cece', '1522202176988-66273c2fd55f',
  '1519452285816-bfcc6e326b01', '1492538368671-040fd059882f', '1527891751199-7225231a68ce',
  '1590400030571-061219b16ea9', '1607237149723-eeb24f466b0d', '1503676260728-1c00da094a0b',
  '1523580494863-6f3031224c94', '1523240875995-c71c855aa51b', '1555126634-ae3230a6b4fa',
  '1497360481068-d018b6eaf3bb', '1517486808906-6ca8b3f04846', '1580582932707-520aed937b7b',
  '1576060133496-5fc7a305574c', '1571260894541-698f2b8f88db', '1513258496099-48162023a58d',
  '1541829070740-22564c23f1b9', '1598257006458-087169a1f08d'
];
const getImg = (i: number) => `https://images.unsplash.com/photo-${images[i % images.length]}?w=800&h=400&fit=crop`;

async function main() {
  console.log('Seeding database...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  const rawUsers = [
    { email: 'demo@example.com', name: 'Demo User', role: 'ADMIN' as const },
    { email: 'rahul@example.com', name: 'Rahul Sharma', role: 'USER' as const },
    { email: 'priya@example.com', name: 'Priya Patel' },
    { email: 'amit@example.com', name: 'Amit Kumar' },
    { email: 'neha@example.com', name: 'Neha Singh' },
    { email: 'vikram@example.com', name: 'Vikram Reddy' },
    { email: 'sneha@example.com', name: 'Sneha Gupta' }
  ];

  const users = await Promise.all(
    rawUsers.map(u => 
      prisma.user.upsert({
        where: { email: u.email },
        update: { role: u.role },
        create: { email: u.email, name: u.name, password: hashedPassword, role: u.role }
      })
    )
  );

  // Clear existing to avoid duplicates
  await prisma.college.deleteMany({});
  
  const rawColleges = [
    { n: 'IIT Bombay', s: 'iit-bombay', l: 'Powai, Mumbai', c: 'Mumbai', st: 'Maharashtra', t: 'Public', ey: 1958, r: 4.8, rk: 3, fmin: 200000, fmax: 800000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'Computer Science', c2: 'Electrical', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqRp8peoU4JLloahCKsR2ytNZbNRbH3WALCOE4LgtPfg&s=10', w: 'https://www.iitb.ac.in/' },
    { n: 'IIT Delhi', s: 'iit-delhi', l: 'Hauz Khas, New Delhi', c: 'New Delhi', st: 'Delhi', t: 'Public', ey: 1961, r: 4.7, rk: 2, fmin: 210000, fmax: 850000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'Mechanical', c2: 'Civil', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vmymSoryu9cnoLgfzgTMp2Q4yanHNAgaL8XHHiqemg&s=10', w: 'https://home.iitd.ac.in/' },
    { n: 'IIM Ahmedabad', s: 'iim-ahmedabad', l: 'Vastrapur, Ahmedabad', c: 'Ahmedabad', st: 'Gujarat', t: 'Public', ey: 1961, r: 4.9, rk: 1, fmin: 2500000, fmax: 3000000, a: 'EQUIS, AMBA', d: 'MBA', c1: 'PGP', c2: 'PGP-FABM', img: 'https://insideiim.com/_next/image?url=https%3A%2F%2Fcdn.insideiim.com%2Fwp-content%2Fuploads%2F2023%2F09%2F20192341%2FIIM-Ahmedabad2.jpeg&w=3840&q=72', w: 'https://www.iima.ac.in/' },
    { n: 'VIT Vellore', s: 'vit-vellore', l: 'Vellore, Tamil Nadu', c: 'Vellore', st: 'Tamil Nadu', t: 'Private', ey: 1984, r: 4.2, rk: 11, fmin: 700000, fmax: 1500000, a: 'NAAC A++', d: 'B.Tech', c1: 'CSE Core', c2: 'Electronics', img: 'https://admissions.vit.ac.in/ugnriapplication/assets/img/vellore_campus.jpg', w: 'https://vit.ac.in/' },
    { n: 'BITS Pilani', s: 'bits-pilani', l: 'Vidya Vihar, Pilani', c: 'Pilani', st: 'Rajasthan', t: 'Private', ey: 1964, r: 4.6, rk: 20, fmin: 1800000, fmax: 2200000, a: 'NAAC A', d: 'B.E.', c1: 'Computer Science', c2: 'Electrical & Electronics', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrDKU5krpQ0PwVYE-_oYs89aZIv7lA4CVxlB4ddLpjA&s=10', w: 'https://www.bits-pilani.ac.in/' },
    { n: 'IIT Madras', s: 'iit-madras', l: 'Chennai, Tamil Nadu', c: 'Chennai', st: 'Tamil Nadu', t: 'Public', ey: 1959, r: 4.9, rk: 1, fmin: 200000, fmax: 800000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'Aerospace', c2: 'Computer Science', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDMvDK9bi-d0Vwuv5tM8as_JzlLUD9wM7S3X_Msotvw&s=10', w: 'https://www.iitm.ac.in/' },
    { n: 'IIT Kanpur', s: 'iit-kanpur', l: 'Kanpur, UP', c: 'Kanpur', st: 'Uttar Pradesh', t: 'Public', ey: 1959, r: 4.7, rk: 4, fmin: 200000, fmax: 800000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'CSE', c2: 'Mathematics', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQshodEFINiSc__FkWHvfvSVIs9EcZTjU_kC3n0OzoE7Q&s=10', w: 'https://www.iitk.ac.in/' },
    { n: 'IIT Kharagpur', s: 'iit-kharagpur', l: 'Kharagpur, WB', c: 'Kharagpur', st: 'West Bengal', t: 'Public', ey: 1951, r: 4.6, rk: 6, fmin: 200000, fmax: 800000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'Architecture', c2: 'Computer Science', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0elioRCi3xrM9iYq1JuAlUZHbrRIkMIyylsEEDHT-KA&s=10', w: 'http://www.iitkgp.ac.in/' },
    { n: 'IIT Roorkee', s: 'iit-roorkee', l: 'Roorkee, Uttarakhand', c: 'Roorkee', st: 'Uttarakhand', t: 'Public', ey: 1847, r: 4.5, rk: 7, fmin: 200000, fmax: 800000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'Civil', c2: 'Computer Science', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfITifwNDyDQjOoUo7KTS0grCdy4ykzvZFsPVTAytpfQ&s=10', w: 'https://www.iitr.ac.in/' },
    { n: 'IIT Guwahati', s: 'iit-guwahati', l: 'Guwahati, Assam', c: 'Guwahati', st: 'Assam', t: 'Public', ey: 1994, r: 4.4, rk: 8, fmin: 200000, fmax: 800000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'Design', c2: 'Computer Science', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8N1CinOXxg8VolcAOAKmb6g6uawng97-3UnMFC6_G_Q&s=10', w: 'https://www.iitg.ac.in/' },
    { n: 'NIT Trichy', s: 'nit-trichy', l: 'Tiruchirappalli, TN', c: 'Trichy', st: 'Tamil Nadu', t: 'Public', ey: 1964, r: 4.3, rk: 9, fmin: 150000, fmax: 600000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'CSE', c2: 'Mechanical', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQup_wBNEBVPAbzhPs2Jf5N0Z3SfWA_r8YWpk3jdhWoVQ&s', w: 'https://www.nitt.edu/' },
    { n: 'NIT Warangal', s: 'nit-warangal', l: 'Warangal, Telangana', c: 'Warangal', st: 'Telangana', t: 'Public', ey: 1959, r: 4.2, rk: 21, fmin: 150000, fmax: 600000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'CSE', c2: 'ECE', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UNik3iHN3mOSp9LzzwGrDf85fe3hvuKK79p-8D6bKw&s', w: 'https://www.nitw.ac.in/' },
    { n: 'NIT Surathkal', s: 'nit-surathkal', l: 'Mangalore, Karnataka', c: 'Mangalore', st: 'Karnataka', t: 'Public', ey: 1960, r: 4.2, rk: 12, fmin: 150000, fmax: 600000, a: 'Institute of National Importance', d: 'B.Tech', c1: 'CSE', c2: 'IT', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5XX5jNxZ6KiuHxYyRRiunnlQMH4tgghg1rnU5Jey1A&s=10', w: 'https://www.nitk.ac.in/' },
    { n: 'IIM Bangalore', s: 'iim-bangalore', l: 'Bannerghatta Rd, Bangalore', c: 'Bangalore', st: 'Karnataka', t: 'Public', ey: 1973, r: 4.9, rk: 2, fmin: 2400000, fmax: 2900000, a: 'EQUIS, AMBA', d: 'MBA', c1: 'PGP', c2: 'PGPEM', img: 'https://mbagradschools.com/wp-content/uploads/2024/02/IIM-Indian-Institute-of-Management-Bangalore-building.jpg', w: 'https://www.iimb.ac.in/' },
    { n: 'IIM Calcutta', s: 'iim-calcutta', l: 'Joka, Kolkata', c: 'Kolkata', st: 'West Bengal', t: 'Public', ey: 1961, r: 4.8, rk: 3, fmin: 2300000, fmax: 2800000, a: 'AMBA, AACSB', d: 'MBA', c1: 'PGP', c2: 'PGPEX', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQklv5ZDdWYGn8FSCmwy2Zc-8CggkRY2hLWP0erHVOTzw&s=10', w: 'https://www.iimcal.ac.in/' },
    { n: 'IIM Lucknow', s: 'iim-lucknow', l: 'Prabandh Nagar, Lucknow', c: 'Lucknow', st: 'Uttar Pradesh', t: 'Public', ey: 1984, r: 4.7, rk: 6, fmin: 2000000, fmax: 2500000, a: 'AMBA, AACSB', d: 'MBA', c1: 'PGPM', c2: 'PGP-ABM', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqg0QTWcV5byPxQa969xnEG-quUSLKYJGofIT9NVE9Pg&s=10', w: 'https://www.iiml.ac.in/' },
    { n: 'IIM Indore', s: 'iim-indore', l: 'Prabandh Shikhar, Indore', c: 'Indore', st: 'Madhya Pradesh', t: 'Public', ey: 1996, r: 4.6, rk: 7, fmin: 1800000, fmax: 2200000, a: 'AMBA, AACSB', d: 'MBA', c1: 'PGP', c2: 'IPM', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrKc1ToKi3yHP4ys6oXaJxAH6VDvEYHhYYpSZujgwBA&s=10', w: 'https://www.iimidr.ac.in/' },
    { n: 'AIIMS Delhi', s: 'aiims-delhi', l: 'Ansari Nagar, New Delhi', c: 'New Delhi', st: 'Delhi', t: 'Public', ey: 1956, r: 4.9, rk: 1, fmin: 10000, fmax: 50000, a: 'Institute of National Importance', d: 'MBBS', c1: 'Medicine', c2: 'Surgery', img: 'https://medicaldialogues.in/h-upload/2022/10/10/187486-aiims-delhi.webp', w: 'https://www.aiims.edu/' },
    { n: 'JIPMER', s: 'jipmer', l: 'Dhanvantari Nagar, Puducherry', c: 'Puducherry', st: 'Puducherry', t: 'Public', ey: 1823, r: 4.7, rk: 5, fmin: 15000, fmax: 60000, a: 'Institute of National Importance', d: 'MBBS', c1: 'MBBS', c2: 'B.Sc Nursing', w: 'https://jipmer.edu.in/', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPojG54lPv1FXdv9IWCrF945piATJMDn2za7D21WsBg&s' },
    { n: 'SRM Institute of Science and Technology', s: 'srmist', l: 'Kattankulathur, Chennai', c: 'Chennai', st: 'Tamil Nadu', t: 'Private', ey: 1985, r: 4.0, rk: 18, fmin: 1000000, fmax: 1800000, a: 'NAAC A++', d: 'B.Tech', c1: 'CSE', c2: 'Biotechnology', w: 'https://www.srmist.edu.in/' },
    { n: 'Manipal Academy of Higher Education', s: 'mahe', l: 'Madhav Nagar, Manipal', c: 'Manipal', st: 'Karnataka', t: 'Private', ey: 1953, r: 4.3, rk: 7, fmin: 1200000, fmax: 2000000, a: 'NAAC A++', d: 'B.Tech', c1: 'CSE', c2: 'Mechatronics', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPUPd3NbR4BAW1_y-ka1ywfjBF5Dt8ByR-aujQp20HxQ&s=10', w: 'https://manipal.edu/' },
    { n: 'Amity University', s: 'amity-university', l: 'Sector 125, Noida', c: 'Noida', st: 'Uttar Pradesh', t: 'Private', ey: 2005, r: 3.9, rk: 35, fmin: 800000, fmax: 1600000, a: 'NAAC A+', d: 'B.Tech', c1: 'CSE', c2: 'IT', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuD1BexQMgRnAvuo6_77ro-0rbL-IbUF_Co96qVVJPJg&s=10', w: 'https://www.amity.edu/' },
    { n: 'Christ University', s: 'christ-university', l: 'Hosur Road, Bangalore', c: 'Bangalore', st: 'Karnataka', t: 'Private', ey: 1969, r: 4.2, rk: 60, fmin: 500000, fmax: 1000000, a: 'NAAC A+', d: 'BBA', c1: 'Finance', c2: 'Marketing', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkDUtzmSFQYjn_xeEHlZz94-Qe_hplszhG6VJUqTZnhw&s=10', w: 'https://christuniversity.in/' },
    { n: 'Indian Institute of Science', s: 'iisc', l: 'CV Raman Rd, Bangalore', c: 'Bangalore', st: 'Karnataka', t: 'Public', ey: 1909, r: 4.9, rk: 2, fmin: 100000, fmax: 300000, a: 'Institute of National Importance', d: 'B.Sc', c1: 'Physics', c2: 'Mathematics', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZadzAIIWmIW6gi8GHg0l3CqXvfC8o9wAD2FJx_-TSk8u1DUUtK-xGl3g&s=10', w: 'https://iisc.ac.in/' }
  ];

  for (let i = 0; i < rawColleges.length; i++) {
    const data = rawColleges[i];
    
    const isTopTier = data.rk <= 10;
    const avg = isTopTier ? 2000000 : 800000 + (Math.random() * 500000);
    const highest = avg * (isTopTier ? 3 : 2);
    const rate = isTopTier ? 98 : 85 + (Math.random() * 10);
    const recruiters = ['Microsoft', 'Google', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Cognizant', 'Capgemini'].sort(() => 0.5 - Math.random()).slice(0, 5);

    const nonAdminUsers = users.slice(1);
    const shuffledUsers = [...nonAdminUsers].sort(() => 0.5 - Math.random());
    const user1 = shuffledUsers[0];
    const user2 = shuffledUsers[1];

    const college = await prisma.college.create({
      data: {
        name: data.n,
        slug: data.s,
        location: data.l,
        city: data.c,
        state: data.st,
        type: data.t,
        establishedYear: data.ey,
        rating: data.r,
        ranking: data.rk,
        feesMin: data.fmin,
        feesMax: data.fmax,
        description: `${data.n} is a prestigious ${data.t.toLowerCase()} institution located in ${data.l}. It is known for its excellent academic curriculum, vibrant campus life, and strong industry connections. The institute has consistently ranked among the top colleges in India and offers world-class facilities to its students.`,
        image: (data as any).img || getImg(i),
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.n)}&size=100&background=random`,
        website: (data as any).w || `https://www.${data.s}.ac.in/`,
        accreditation: data.a,
        courses: {
          create: [
            { name: data.c1, duration: data.d.includes('Tech') ? '4 Years' : '3 Years', degree: data.d, fees: data.fmax },
            { name: data.c2, duration: data.d.includes('Tech') ? '4 Years' : '3 Years', degree: data.d, fees: data.fmin }
          ]
        },
        placements: {
          create: [
            { year: 2024, averagePackage: Math.round(avg), highestPackage: Math.round(highest), medianPackage: Math.round(avg * 0.9), placementRate: Number(rate.toFixed(1)), topRecruiters: recruiters },
            { year: 2023, averagePackage: Math.round(avg * 0.9), highestPackage: Math.round(highest * 0.9), medianPackage: Math.round(avg * 0.8), placementRate: Number((rate - 2).toFixed(1)), topRecruiters: recruiters.slice(0, 4) }
          ]
        },
        reviews: {
          create: [
            { rating: data.r, title: 'Great Campus Life', content: 'The campus is huge and lush green. The faculty is highly experienced and helpful. Placements are top-notch.', category: 'Campus Life', userId: user1.id },
            { rating: data.r - 0.5, title: 'Good Academics but strict', content: 'Academics are very rigorous. You will learn a lot but be prepared for a heavy workload.', category: 'Academics', userId: user2.id }
          ]
        }
      }
    });
    console.log(`Created college: ${college.name}`);
  }

  console.log('Seeding completed. Total colleges: ' + rawColleges.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
