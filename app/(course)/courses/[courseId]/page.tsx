// Import other modules as needed
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { verifyTransaction } from "@/actions/verify-transaction";

const CourseIdPage = async ({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { success: string; reference: string };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  if (searchParams && searchParams.success) {
    // Replace 'yourPriceVariable' with the actual variable or logic for the course price
    const price = calculatePrice(course);

    const { success } = await verifyTransaction(
      searchParams.reference,
      params.courseId,
      price
    );

    if (!success) {
      // show error to the user??
    }

    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

// Replace this function with your actual logic to calculate the course price
const calculatePrice = (course: {
  price: number | null;
  chapters: {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
} & {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}) => {
  // Your logic to calculate the course price goes here
  // For example, you might retrieve it from the course object or another source
  return course.price ?? 0; // Use a default value if course.price is null
};

export default CourseIdPage;
