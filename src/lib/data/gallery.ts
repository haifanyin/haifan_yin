// Gallery photo data — one array per category folder.

export type GalleryFolder = 'awards' | 'conference attendance' | 'team events' | 'team activities'

export type GalleryPhoto = {
  src: string
  caption: string
  year?: number
  month?: number
}

export const galleryPhotos: Record<GalleryFolder, GalleryPhoto[]> = {
  awards: [
    { src: '/gallery/awards/2025-09-Address at the Undergraduate Opening Ceremony.jpg', caption: 'Address at the Undergraduate Opening Ceremony', year: 2025, month: 9 },
    { src: '/gallery/awards/2024-11-CIC Youth Science and Technology Award Ceremony.jpg', caption: 'CIC Youth Science and Technology Award Ceremony', year: 2024, month: 11 },
    { src: '/gallery/awards/2024-07-Rice Prize.jpg', caption: 'Rice Prize', year: 2024, month: 7 },
    { src: '/gallery/awards/2024-04-China Youth May Fourth Medal Award Ceremony.jpg', caption: 'China Youth May Fourth Medal Award Ceremony', year: 2024, month: 4 },
    { src: '/gallery/awards/2023-05-Best Mentor Award Address at the 15th Anniversary Celebration of National Undergraduate Innovation and Entrepreneurship.jpg', caption: 'Best Mentor Award Address at the 15th Anniversary Celebration of National Undergraduate Innovation and Entrepreneurship', year: 2023, month: 5 },
  ],
  'conference attendance': [
    { src: '/gallery/conference attendance/2026-05-2026 Conference on ICT Innovation and Frontiers.jpg', caption: '2026 Conference on ICT Innovation and Frontiers', year: 2026, month: 5 },
    { src: '/gallery/conference attendance/2024-11-The 3rd RIS forum.jpg', caption: 'The 3rd RIS TECH Forum', year: 2024, month: 11 },
    { src: '/gallery/conference attendance/2024-03-EUCAP.jpg', caption: 'EuCAP 2024', year: 2024, month: 3 },
    { src: '/gallery/conference attendance/2024-09-PIMRC.jpg', caption: 'PIMRC 2024', year: 2024, month: 9 },
    { src: '/gallery/conference attendance/2023-02-The 2nd RIS Forum.jpg', caption: 'The 2nd RIS TECH Forum', year: 2023, month: 2 },
    { src: '/gallery/conference attendance/2021-09-The 1st RIS Forum.jpg', caption: 'The 1st RIS TECH Forum', year: 2021, month: 9 },
  ],
  'team events': [
    { src: "/gallery/team events/2026-06-graduation.jpg", caption: "Graduation", year: 2026, month: 6 },
    { src: "/gallery/team events/2025-12-graduation.jpg", caption: "Graduation", year: 2025, month: 12 },
    { src: "/gallery/team events/2025-11-Rongguang Song's defence.jpg", caption: "Rongguang Song's Defence", year: 2025, month: 11 },
    { src: "/gallery/team events/2022-09-teacher's day.jpg", caption: "Teacher's Day", year: 2022, month: 9 },
    { src: '/gallery/team events/2022-06-graduation.jpg', caption: 'Graduation', year: 2022, month: 6 },
    { src: "/gallery/team events/2025-09-teacher's day.jpg", caption: "Teacher's Day", year: 2025, month: 9 },
    { src: "/gallery/team events/2025-08-Weidong Li's defence.jpg", caption: "Weidong Li's Defence", year: 2025, month: 8 },
    { src: "/gallery/team events/2024-09-teacher's day 2.jpg", caption: "Teacher's Day", year: 2024, month: 9 },
    { src: "/gallery/team events/2024-09-teacher's day.jpg", caption: "Teacher's Day", year: 2024, month: 9 },
    { src: '/gallery/team events/2024-06-graduation 2.jpg', caption: 'Graduation', year: 2024, month: 6 },
    { src: '/gallery/team events/2024-06-graduation.jpg', caption: 'Graduation', year: 2024, month: 6 },
    { src: "/gallery/team events/2024-05-Ziao Qin's defence.jpg", caption: "Ziao Qin's Defence", year: 2024, month: 5 },
  ],
  'team activities': [
    { src: '/gallery/team activities/2025-06-summer team activity.jpg', caption: 'Skiing Team Activity', year: 2025, month: 6 },
    { src: '/gallery/team activities/2025-06-football match.jpg', caption: 'Football Match', year: 2025, month: 6 },
    { src: '/gallery/team activities/2025-01-winter team activity.jpg', caption: 'Winter Team Activity', year: 2025, month: 1 },
    { src: '/gallery/team activities/2024-09-football match.jpg', caption: 'Football Match', year: 2024, month: 9 },
    { src: '/gallery/team activities/2022-05-summer team activity 2.jpg', caption: 'Summer Team Activity', year: 2022, month: 5 },
    { src: '/gallery/team activities/2022-05-summer team activity.jpg', caption: 'Summer Team Activity', year: 2022, month: 5 },
    { src: '/gallery/team activities/2020-10-summer team activity.jpg', caption: 'Fishing Team Activity', year: 2020, month: 10 },
    { src: '/gallery/team activities/2020-01-winter team activity.jpg', caption: 'Pottery Team Activity', year: 2020, month: 1 },
    { src: '/gallery/team activities/2021-11-winter team activity.jpg', caption: 'East Lake Outing Team Activity', year: 2021, month: 11 },
  ],
}
