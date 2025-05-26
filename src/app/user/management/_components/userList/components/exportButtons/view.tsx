
import { IExportButtonProps } from './types';

export const ExportButton = ({ onExport, label, variant = 'primary' }: IExportButtonProps) => {
    const colors = {
        primary: 'bg-blue-600',
        success: 'bg-green-600',
    };

    return (
        <button
            onClick={onExport}
            className={`p-2 text-white rounded cursor-pointer hover:opacity-[0.7] transition-all ${colors[variant]}`}
        >
            {label}
        </button>
    );
};
