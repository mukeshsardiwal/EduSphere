import React, { useState } from "react";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import { CourseData } from "../../context/CourseContext";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { fetchCourses } = CourseData();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: { token: localStorage.getItem("token") },
      });

      toast.success(data.message);
      await fetchCourses();
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePrev("");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Add Course</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Created By"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Duration (hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input type="file" required onChange={changeImageHandler} className="w-full p-2 border rounded" />
          {imagePrev && <img src={imagePrev} alt="Preview" className="w-48 h-auto rounded-lg mt-2" />}

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {btnLoading ? "Please Wait..." : "Add"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddCourse;
