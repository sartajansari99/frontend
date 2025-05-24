import { useState } from "react";
import "./Registration_page.css";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rfid: "",
    semester: "",
    schooling: "",
    schoolingPer: "",
    intermediate: "",
    intermediatePer: "",
    fatherName: "",
    motherName: "",
    parentEmail: "",
    cgpa: "",
    batches: "",
    branch: "",
    photo: "" // Base64 image
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ⬇️ Utility to convert base64 to File
  function base64ToFile(base64String, filename) {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.rfid.trim()) newErrors.rfid = "RFID is required.";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required.";
    if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required.";
    if (!formData.schooling.trim()) newErrors.schooling = "10th School name is required.";
    if (formData.schoolingPer < 0 || formData.schoolingPer > 100) {
      newErrors.schoolingPer = "10th Percentage must be between 0-100.";
    }
    if (!formData.intermediate.trim()) newErrors.intermediate = "12th School name is required.";
    if (formData.intermediatePer < 0 || formData.intermediatePer > 100) {
      newErrors.intermediatePer = "12th Percentage must be between 0-100.";
    }
    if (!formData.semester || formData.semester <= 0) {
      newErrors.semester = "Semester must be a valid number.";
    }
    if (!formData.batches || formData.batches <= 0) {
      newErrors.batches = "Batches must be a valid input.";
    }
    if (!formData.branch) {
      newErrors.branch = "Branch must be provided.";
    }
    if (!formData.photo) newErrors.photo = "Student photo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const file = base64ToFile(formData.photo, "student_photo.png");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== "photo") {
        formDataToSend.append(key, formData[key]);
      }
    });
    formDataToSend.append("photo", file); // append photo as File

    try {
      const response = await fetch("https://finallyback-3.onrender.com/api/users/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setErrors({ general: data.message });
      }
    } catch (err) {
      setErrors({ general: "Server error. Please try again later." });
    }

    console.log("Form Submitted:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="container">
      <h2 className="title">Student Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <input type="text" name="rfid" placeholder="RFID" value={formData.rfid} onChange={handleChange} />
        {errors.rfid && <p className="error">{errors.rfid}</p>}

        <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} />
        {errors.semester && <p className="error">{errors.semester}</p>}

        <input type="text" name="fatherName" placeholder="Father's name" value={formData.fatherName} onChange={handleChange} />
        {errors.fatherName && <p className="error">{errors.fatherName}</p>}

        <input type="text" name="motherName" placeholder="Mother's name" value={formData.motherName} onChange={handleChange} />
        {errors.motherName && <p className="error">{errors.motherName}</p>}

        <input type="email" name="parentEmail" placeholder="Parent Email" value={formData.parentEmail} onChange={handleChange} />
        {errors.parentEmail && <p className="error">{errors.parentEmail}</p>}

        <input type="text" name="schooling" placeholder="10th School name" value={formData.schooling} onChange={handleChange} />
        {errors.schooling && <p className="error">{errors.schooling}</p>}

        <input type="number" name="schoolingPer" placeholder="10th Percentage" value={formData.schoolingPer} onChange={handleChange} />
        {errors.schoolingPer && <p className="error">{errors.schoolingPer}</p>}

        <input type="text" name="intermediate" placeholder="12th School name" value={formData.intermediate} onChange={handleChange} />
        {errors.intermediate && <p className="error">{errors.intermediate}</p>}

        <input type="number" name="intermediatePer" placeholder="12th Percentage" value={formData.intermediatePer} onChange={handleChange} />
        {errors.intermediatePer && <p className="error">{errors.intermediatePer}</p>}

        <input type="number" name="batches" placeholder="Batches" value={formData.batches} onChange={handleChange} />
        {errors.batches && <p className="error">{errors.batches}</p>}

        <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
        {errors.branch && <p className="error">{errors.branch}</p>}

        <label className="upload-label">Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {errors.photo && <p className="error">{errors.photo}</p>}

        <button type="submit" className="submit-btn">Register</button>
        <p className="form-footer">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default StudentRegistration;
