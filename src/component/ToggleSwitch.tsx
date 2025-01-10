interface DataProps {
    label : string;
    checked : boolean;
    onToggle : () => void;
}

const ToggleSwitch: React.FC<DataProps> = ({ label, checked, onToggle }) => {
    return (
        <div className="flex justify-between items-center">
            <span className="font-medium">{label}:</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onToggle}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white   
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all   
                peer-checked:bg-blue-600"></div>
            </label>    
        </div>
    );
};

export default ToggleSwitch;