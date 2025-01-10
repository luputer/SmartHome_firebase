interface DataProps {
    label: string;
    value: number | string;
}

const SensorDataItem: React.FC<DataProps> = ({ label, value })  => {
    return (
        <div className="flex justify-between items-center">
            <span className="font-medium">{label}:</span>
            <span className="font-semibold text-white">{value}</span>
        </div>
    )
}

export default SensorDataItem
