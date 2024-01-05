import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { verifyTransaction } from "@/actions/verify-transaction";

const CourseIdPage = async ({
  params,
  searchParams,
}: {
  params: { courseId: string; },
  searchParams: { success: string; reference: string; },
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
          position: "asc"
        }
      }
    }
  });

  
  if (!course) {
    return redirect("/");
  }

  if (searchParams && searchParams.success) {
    const {
      success,
    } = await verifyTransaction(
      searchParams.reference,
      params.courseId,
    );

    if (!success) {
      // show error to user??
    }

    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;