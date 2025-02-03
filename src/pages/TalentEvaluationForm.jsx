import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const competencies = [
    "Functional / Job Knowledge",
    "Presentation / Communication Skills",
    "Maturity and Confidence",
    "Execution skill / Getting things done",
    "Customer management skill",
    "Passion and drive",
    "People management skill",
    "Innovations and Creativity on job",
    "Honesty and Integrity",
    "Stability on the job",
];

const ratings = [
    "6 - Outstanding", "5 - Very Good", "4 - Good", "3 - Satisfactory",
    "2 - Below Average", "1 - Not Acceptable", "NA - Not Applicable"
];

const InputField = ({ label, type = "text", value, onChange }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <input type={type} className="form-control shadow-sm border-light" value={value} onChange={onChange} />
    </div>
);

const SelectField = ({ label, options, value, onChange }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <select className="form-select shadow-sm border-light" value={value} onChange={onChange}>
            <option value="">Select</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

const TalentEvaluationForm = () => {
    const [interviewerCount, setInterviewerCount] = useState(3);
    const [formData, setFormData] = useState({
        name: "", qualification: "", date: "", age: "", company: "",
        competencyRatings: Array(competencies.length).fill(Array(interviewerCount).fill("")),
        interviewerNames: Array(interviewerCount).fill(""),
        interviewerComments: Array(interviewerCount).fill(""),
        finalRecommendation: ""
    });

    const handleInputChange = (field, value, index = null) => {
        if (index !== null) {
            const updatedField = [...formData[field]];
            updatedField[index] = value;
            setFormData({ ...formData, [field]: updatedField });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleRatingChange = (index, interviewer, value) => {
        const newRatings = formData.competencyRatings.map((row, i) =>
            i === index ? row.map((val, j) => (j === interviewer ? value : val)) : row
        );
        setFormData({ ...formData, competencyRatings: newRatings });
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 font-weight-bold text-primary">Talent Evaluation Form – TEF 2025</h2>
            <form>
                {/* Personal Information Section */}
                <div className="card shadow-lg p-4 mb-4 rounded-3">
                    <h4 className="text-center mb-3 text-info">Personal Information</h4>
                    <div className="row">
                        <div className="col"><InputField label="Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} /></div>
                        <div className="col"><InputField label="Highest Qualification" value={formData.qualification} onChange={(e) => handleInputChange("qualification", e.target.value)} /></div>
                    </div>
                    <div className="row">
                        <div className="col"><InputField label="Date" type="date" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} /></div>
                        <div className="col"><InputField label="Age" type="number" value={formData.age} onChange={(e) => handleInputChange("age", e.target.value)} /></div>
                        <div className="col"><InputField label="Company" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} /></div>
                    </div>
                </div>

                {/* Competency Assessment Section */}
                <div className="card shadow-lg p-4 mb-4 rounded-3">
                    <h4 className="text-center mb-3 text-info">Competency Assessment</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Competency</th>
                                {[...Array(interviewerCount)].map((_, i) => (
                                    <th key={i}>Interviewer {i + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {competencies.map((competency, index) => (
                                <tr key={index}>
                                    <td>{competency}</td>
                                    {[...Array(interviewerCount)].map((_, i) => (
                                        <td key={i}>
                                            <SelectField
                                                options={ratings}
                                                value={formData.competencyRatings[index][i]}
                                                onChange={(e) => handleRatingChange(index, i, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Interviewers Section */}
                <div className="card shadow-lg p-4 mb-4 rounded-3">
                    <h4 className="text-center mb-3 text-info">Interviewers</h4>
                    {[...Array(interviewerCount)].map((_, i) => (
                        <div key={i} className="mb-3">
                            <InputField label={`Interviewer ${i + 1} Name`} value={formData.interviewerNames[i]} onChange={(e) => handleInputChange("interviewerNames", e.target.value, i)} />
                            <InputField label={`Interviewer ${i + 1} Comment`} value={formData.interviewerComments[i]} onChange={(e) => handleInputChange("interviewerComments", e.target.value, i)} />
                        </div>
                    ))}
                    <button type="button" className="btn btn-warning mb-3" onClick={() => setInterviewerCount(interviewerCount + 1)}>+ Add Interviewer</button>
                </div>

                {/* Final Recommendation Section */}
                <div className="card shadow-lg p-4 mb-4 rounded-3">
                    <h4 className="text-center mb-3 text-info">Final Recommendation</h4>
                    <SelectField label="Hiring Decision" options={["Yes", "No"]} value={formData.finalRecommendation} onChange={(e) => handleInputChange("finalRecommendation", e.target.value)} />
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success px-4 py-2">Submit</button>
                    <button type="reset" className="btn btn-danger px-4 py-2">Reset</button>
                </div>
            </form>
        </div>
    );
};

export default TalentEvaluationForm;
