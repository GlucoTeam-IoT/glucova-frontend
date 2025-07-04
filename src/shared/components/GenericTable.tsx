import type { ReactNode } from "react";

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (value: any, item: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface TableAction<T = any> {
  label: string;
  icon?: ReactNode;
  onClick: (item: T) => void;
  className?: string;
  show?: (item: T) => boolean;
}

export interface GenericTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  loading?: boolean;
  emptyState?: {
    icon?: ReactNode;
    title: string;
    description?: string;
  };
  className?: string;
  rowClassName?: (item: T) => string;
}

const GenericTable = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  loading = false,
  emptyState,
  className = "",
  rowClassName,
}: GenericTableProps<T>) => {
  if (loading) {
    return (
      <div className="bg-white rounded-md shadow border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-md shadow border border-gray-200 p-6 text-center">
        {emptyState?.icon && (
          <div className="flex justify-center mb-3">
            <div className="bg-blue-100 rounded-full p-3">
              {emptyState.icon}
            </div>
          </div>
        )}
        <p className="text-gray-500 font-medium">{emptyState?.title}</p>
        {emptyState?.description && (
          <p className="text-gray-400 text-sm mt-1">{emptyState.description}</p>
        )}
      </div>
    );
  }

  const getValue = (item: T, key: string) => {
    return key.split(".").reduce((obj, k) => obj?.[k], item);
  };

  return (
    <div
      className={`overflow-x-auto rounded-md shadow border border-gray-200 ${className}`}
    >
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-2 font-medium ${column.className || ""}`}
              >
                {column.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-2 text-right font-medium">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={`border-t hover:bg-gray-50 ${
                rowClassName ? rowClassName(item) : ""
              }`}
            >
              {columns.map((column) => {
                const value = getValue(item, column.key);
                return (
                  <td
                    key={column.key}
                    className={`px-4 py-2 ${column.className || ""}`}
                  >
                    {column.render ? column.render(value, item) : String(value ?? '')}
                  </td>
                );
              })}
              {actions.length > 0 && (
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {actions.map((action, actionIndex) => {
                      if (action.show && !action.show(item)) return null;

                      return (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          className={`transition-colors ${
                            action.className ||
                            "p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                          }`}
                          aria-label={action.label}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      );
                    })}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
