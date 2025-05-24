import React, { useEffect, useState } from 'react';

function RequirementField({ name, label, register, errors, setValue }) {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    // Register field on mount
    useEffect(() => {
        if (register) {
            register(name, {
                required: true,
                validate: (value) => value.length > 0
            });
        }
    }, [register, name]);

    // Update the form field value
    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, setValue, name]);

    const handleAddRequirement = () => {
        if (requirement.trim()) {
            setRequirementList([...requirementList, requirement.trim()]);
            setRequirement("");
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementList]
        updatedRequirements.splice(index, 1)
        setRequirementList(updatedRequirements)
      }

    return (
        <div>
            <label htmlFor={name}>{label}<sup>*</sup></label>
            <div>
                <input 
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)} 
                    className="w-full"
                />
                <button type="button" 
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50">
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul>
                    {requirementList.map((req, index) => (
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{req}</span>
                            <button
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-xs text-pure-greys-300">Clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors?.[name] && (
                <span>{label} is required</span>
            )}
        </div>
    );
}

export default RequirementField;
