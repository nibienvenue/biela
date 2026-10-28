export default function SelectInput({ label, value, onChange, options = [], required = false }) {
    return (
        <label className="block">
            <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">{label}</div>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option value="">Select...</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

