import React from "react";

type selectData = {
    group: string,
    name: string,
    data: [{id: string, name: string}],
    changeHandler: (event:React.ChangeEvent<HTMLSelectElement>) => void
}

const Select:React.FC<selectData> = (props) => {

    return (
        <div>
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> 그룹 </label>

            <select
                value={props.group}
                onChange={props.changeHandler}
                name="HeadlineAct"
                id="HeadlineAct"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
                <option value="">{props.name}</option>
                {props.data.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;