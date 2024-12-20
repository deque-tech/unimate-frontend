import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Constants";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    // user_id: '',
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    ethnicity: "",
    major: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    major_interest: "",
    ethnicity_interest: "",
    // email:'',
    // email: cookies.Email,
    url: "",
    about: "",
    funPrompt1: "", // New Fun Prompt 1
    funPrompt2: "", // New Fun Prompt 2
    funPrompt3: "", // New Fun Prompt 3
    funPrompt4: "", // New Fun Prompt 4
    matches: [],
  });

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submitted");

    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/user`, {
        formData,
      });
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('file', image);
    formDataToUpload.append('upload_preset', 'unimate'); // Replace with your upload preset

    try {
      setIsUploading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/davrvhuy2/image/upload',
        formDataToUpload
      );
      const imageUrl = response.data.secure_url;

      setFormData((prevState) => ({
        ...prevState,
        url: imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              {/*<label htmlFor="more-gender-identity">Non-Binary</label>*/}
            </div>

            <section>
              <label htmlFor="ethnicity">Ethnicity:</label>
              <select
                id="ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                // onChange={(e) => setFormData({...formData, ethnicity: e.target.value})}
                onChange={handleChange}
              >
                <option value="">Select your ethnicity</option>
                <option value="Arab">Arab</option>
              <option value="South Asian">South Asian</option>
              <option value="East Asian">East Asian</option>
              <option value="South-East Asian">South-East Asian</option>
              <option value="Black">Black</option>
              <option value="Hispanic/Latino">Hispanic/Latino</option>
              <option value="White">White</option>
              <option value="Native">Native American or Alaska Native</option>
              <option value="Pacific">
                Native Hawaiian or Other Pacific Islander
              </option>
                <option value="other">Other</option>
              </select>
            </section>

            <section>
              <label htmlFor="major">Major:</label>
              <select
                type="text"
                id="major"
                name="major"
                placeholder="Enter your major"
                value={formData.major}
                // onChange={(e) => setFormData({...formData, major: e.target.value})}
                onChange={handleChange}
              >
                <option value="">Select your major</option>
                <option value="Arab Crossroads Studies">Arab Crossroads Studies</option>
                <option value="Art and Art History">Art and Art History</option>
                <option value="Arts and Humanities Colloquia">Arts and Humanities Colloquia</option>
                <option value="Bioengineering">Bioengineering</option>
                <option value="Biology">Biology</option>
                <option value="Business">
                  Business, Organizations and Society
                </option>
                <option value="Chemistry">Chemistry</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Film and New Media">Film and New Media</option>
                <option value="Foundations of Science">Foundations of Science</option>
                <option value="General Engineering">General Engineering</option>
                <option value="History">History</option>
                <option value="Interactive Media<">Interactive Media</option>
                <option value="Legal Studies">Legal Studies</option>
                <option value="Literature and Creative Writing">
                  Literature and Creative Writing
                </option>
                <option value="Mathematics">Mathematics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Music">Music</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Physics">Physics</option>
                <option value="Political Science">Political Science</option>
                <option value="Psychology">Psychology</option>
                <option value="Social Research and Public Policy">Social Research and Public Policy</option>
                <option value="Theatre">Theatre</option>
              </select>
            </section>

            <section>
              <label htmlFor="funPrompt1">
                What’s one thing you're currently grateful for?
              </label>
              <input
                type="text"
                id="funPrompt1"
                name="funPrompt1"
                placeholder="Enter your response"
                value={formData.funPrompt1}
                onChange={(e) =>
                  setFormData({ ...formData, funPrompt1: e.target.value })
                }
              />
            </section>

            <section>
              <label htmlFor="funPrompt2">
                What’s one thing you’ve done recently that you’re proud of?
              </label>
              <input
                type="text"
                id="funPrompt2"
                name="funPrompt2"
                placeholder="Enter your response"
                value={formData.funPrompt2}
                onChange={(e) =>
                  setFormData({ ...formData, funPrompt2: e.target.value })
                }
              />
            </section>

            <section>
              <label htmlFor="funPrompt3">
                What’s the most spontaneous thing you’ve ever done?
              </label>
              <input
                type="text"
                id="funPrompt3"
                name="funPrompt3"
                placeholder="Enter your response"
                value={formData.funPrompt3}
                onChange={(e) =>
                  setFormData({ ...formData, funPrompt3: e.target.value })
                }
              />
            </section>

            <section>
              <label htmlFor="funPrompt4">
                What’s your guilty pleasure TV show?
              </label>
              <input
                type="text"
                id="funPrompt4"
                name="funPrompt4"
                placeholder="Enter your response"
                value={formData.funPrompt4}
                onChange={(e) =>
                  setFormData({ ...formData, funPrompt4: e.target.value })
                }
              />
            </section>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label> Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <select
              type="text"
              id="ethnicity_interest"
              name="ethnicity_interest"
              placeholder="Pick a ethnicity interest"
              value={formData.ethnicity_interest}
              // onChange={(e) => setFormData({...formData, ethnicity: e.target.value})}
              onChange={handleChange}
            >
              <option value="">Pick a ethnicity interest</option>
              <option value="everyone">Everyone</option>
              <option value="Arab">Arab</option>
              <option value="South Asian">South Asian</option>
              <option value="East Asian">East Asian</option>
              <option value="South-East Asian">South-East Asian</option>
              <option value="Black">Black</option>
              <option value="Hispanic/Latino">Hispanic/Latino</option>
              <option value="White">White</option>
              <option value="Native">Native American or Alaska Native</option>
              <option value="Pacific">
                Native Hawaiian or Other Pacific Islander
              </option>
            </select>

            <select
              type="text"
              id="major_interest"
              name="major_interest"
              placeholder="Pick a major interest"
              value={formData.major_interest}
              // onChange={(e) => {
              //     const newValue = e.target.value;
              //     console.log("Selected Major Interest:", newValue); // Log the selected value
              //     setFormData({
              //         ...formData,
              //         major_interest: newValue,
              //     });
              onChange={handleChange}
            >
              <option value="">Pick a major interest</option>
              <option value="everyone">Everyone</option>
              <option value="Arab Crossroads Studies">Arab Crossroads Studies</option>
                <option value="Art and Art History">Art and Art History</option>
                <option value="Arts and Humanities Colloquia">Arts and Humanities Colloquia</option>
                <option value="Bioengineering">Bioengineering</option>
                <option value="Biology">Biology</option>
                <option value="Business">
                  Business, Organizations and Society
                </option>
                <option value="Chemistry">Chemistry</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Film and New Media">Film and New Media</option>
                <option value="Foundations of Science">Foundations of Science</option>
                <option value="General Engineering">General Engineering</option>
                <option value="History">History</option>
                <option value="Interactive Media<">Interactive Media</option>
                <option value="Legal Studies">Legal Studies</option>
                <option value="Literature and Creative Writing">
                  Literature and Creative Writing
                </option>
                <option value="Mathematics">Mathematics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Music">Music</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Physics">Physics</option>
                <option value="Political Science">Political Science</option>
                <option value="Psychology">Psychology</option>
                <option value="Social Research and Public Policy">Social Research and Public Policy</option>
                <option value="Theatre">Theatre</option>
            </select>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="file">Profile Picture</label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <button type="button" onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </button>

            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile-pic-preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
