"use client";

import { Category } from "@prisma/client";
import {
  FcMultipleDevices,
  FcFilmReel,
  FcGraduationCap,
  FcBusinessman,
  FcHome,
  FcSalesPerformance,
  FcRightUp,
  
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Family Advisory": FcBusinessman,
  "Real Estate": FcHome,
  "School of Sales": FcRightUp,
  "Financial Intelligence": FcSalesPerformance,
  "Personal Development": FcGraduationCap,
  "Filming": FcFilmReel,
  "Tech & Products": FcMultipleDevices,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}