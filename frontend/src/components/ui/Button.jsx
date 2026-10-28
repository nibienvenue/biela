export default function Button({ children, onClick, type = 'button', disabled = false, variant = 'primary' }) {
    const cls =
        variant === 'secondary'
            ? 'rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800'
            : 'rounded-lg bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 disabled:opacity-60';

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>
            {children}
        </button>
    );
}

