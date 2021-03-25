import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

const SortControl = ({ sortId, sorting, callBack }) => {

    let activeControl
    if (sortId === sorting.id) {
        if (sorting.direction === 'ascending') {
            activeControl = <FaSortUp/>
        } else if (sorting.direction === 'descending') {
            activeControl = <FaSortDown/>
        }
    } else {
        activeControl = <FaSort/>
    }

    return (<>
        <style jsx>{`
            span {
                opacity: 0.4;
                transition: opacity 0.3s;
            }

            span:hover {
                opacity: 1;
            }

            span.active {
                opacity: 1;
            }
        `}</style>
        <span className={sortId === sorting.id && 'active'} onClick={() => callBack(sortId)}>
            {activeControl}
        </span>
    </>)
}

export default SortControl