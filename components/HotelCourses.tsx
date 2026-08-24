// components/HotelCourses.tsx
// Drive times to all courses shown on every hotel page

import { getCoursesForHotel } from "@/lib/proximity";

interface Props {
  hotelSlug: string;
}

export default function HotelCourses({ hotelSlug }: Props) {
  const courses = getCoursesForHotel(hotelSlug);
  if (courses.length === 0) return null;

  return (
    <section
      style={{
        background: "#F1EFE8",
        borderRadius: 12,
        padding: "1.25rem",
        marginTop: "2rem",
      }}
    >
      <h3
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#2C2C2A",
          marginBottom: "0.75rem",
        }}
      >
        Drive times to courses
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
        className="hotel-courses-grid"
      >
        {courses.map((c) => (
          <a
            key={c.courseSlug}
            href={`/golf-courses/${c.courseSlug}/`}
            style={{
              background: c.isOnSite ? "#042C53" : "#ffffff",
              border: c.isOnSite ? "1.5px solid #042C53" : "0.5px solid #D3D1C7",
              borderRadius: 8,
              padding: "12px 8px",
              textAlign: "center",
              textDecoration: "none",
              display: "block",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: c.isOnSite ? "#ffffff" : c.minutes > 20 ? "#B4B2A9" : "#2C2C2A",
              }}
            >
              {c.isOnSite ? "On-site" : `${c.minutes} min`}
            </div>
            <div
              style={{
                fontSize: 11,
                marginTop: 3,
                color: c.isOnSite ? "rgba(255,255,255,0.65)" : "#5F5E5A",
              }}
            >
              {c.courseName}
            </div>
          </a>
        ))}
      </div>
      <p style={{ marginTop: 10, fontSize: 12, color: "#888780" }}>
        All times approximate driving distance.
      </p>
      <style>{`
        @media (max-width: 480px) {
          .hotel-courses-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
