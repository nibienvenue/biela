export default function TextInput({ label, value, onChange, type = 'text', required = false }) {
    return (
        <label className="block">
            <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">{label}</div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
        </label>
    );
}

