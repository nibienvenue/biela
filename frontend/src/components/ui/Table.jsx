export default function Table({ columns = [], rows = [] }) {
    return (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
            <table className="min-w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {columns.map((c) => (
                            <th key={c.key} className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-200">
                                {c.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td className="px-4 py-6 text-sm text-gray-600 dark:text-gray-300" colSpan={columns.length}>
                                No data
                            </td>
                        </tr>
                    ) : (
                        rows.map((r, idx) => (
                            <tr key={r.id ?? idx} className="border-t border-gray-100 dark:border-gray-700">
                                {columns.map((c) => (
                                    <td key={c.key} className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">
                                        {c.render ? c.render(r) : r[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

