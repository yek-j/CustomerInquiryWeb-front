import React, {useEffect} from "react";

const Button:React.FC<{group:string}> = (props) => {


    return (
        <div>
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> 그룹 </label>

            <select
                value={props.group}
                name="HeadlineAct"
                id="HeadlineAct"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
                <option value="">Group select</option>
                <option value="1">group1</option>
            </select>
        </div>
    );
}

export default Button;