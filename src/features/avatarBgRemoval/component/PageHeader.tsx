import React, { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex items-start">
      {icon && (
        <div className="mr-4 p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-gray-500">{description}</p>}
      </div>
    </div>
  );
};
