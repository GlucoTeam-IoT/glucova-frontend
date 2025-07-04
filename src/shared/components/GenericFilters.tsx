import { useState, useEffect } from "react";

export interface FilterField {
  name: string;
  label: string;
  type: "select" | "text" | "number" | "date";
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  defaultValue?: string | number;
}

export interface GenericFiltersProps {
  title: string;
  fields: FilterField[];
  onFilterChange: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
  className?: string;
}

const GenericFilters = ({
  title,
  fields,
  onFilterChange,
  initialFilters = {},
  className = "",
}: GenericFiltersProps) => {
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value === "" ? null : value,
    };

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderField = (field: FilterField) => {
    const fieldValue = filters[field.name] ?? field.defaultValue ?? "";

    switch (field.type) {
      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={fieldValue}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "text":
        return (
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={fieldValue}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case "number":
        return (
          <input
            type="number"
            id={field.name}
            name={field.name}
            value={fieldValue}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case "date":
        return (
          <input
            type="date"
            id={field.name}
            name={field.name}
            value={fieldValue}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h2 className="text-lg font-medium text-gray-800 mb-3">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericFilters;
