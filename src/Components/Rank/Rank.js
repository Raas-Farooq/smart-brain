

const Rank = ({name, entries}) => {

    return (
        <div>
            <div>
            {`${name}, your current entry count is...`}
            </div>
            <div className="white-f1">{entries}</div>
            </div>
        
    )
}
export default Rank;