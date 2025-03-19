interface NoDataProps {
  message: string,
}

/**
 * @param param {NoDataProps} message - Custom message to display when there is no data available
 * @returns 
 */
const NoData: React.FC<NoDataProps> = ({ message }: NoDataProps) => {
  return <div className="max-w-sm p-4 text-black border border-gray-200 rounded-lg shadow-sm max-h-max">
    <p> {message}</p>
  </div>

}
export default NoData;