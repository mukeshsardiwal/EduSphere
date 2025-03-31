import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";
import { Progress } from "../models/Progress.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// ✅ Debugging: Log environment variables to ensure they are loaded correctly
console.log("Razorpay Key:", process.env.Razorpay_key);
console.log("Razorpay Secret:", process.env.Razorpay_Secret);

// ✅ Fetch all courses
export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ courses });
});

// ✅ Fetch a single course by ID
export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json({ course });
});

// ✅ Fetch lectures for a specific course
export const fetchLectures = TryCatch(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const lectures = await Lecture.find({ course: id });

  if (user.role === "admin") return res.json({ lectures });

  if (!user.subscription.includes(id)) {
    return res.status(400).json({ message: "You have not subscribed to this course" });
  }

  res.json({ lectures });
});

// ✅ Fetch a specific lecture by ID
export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  if (!lecture) return res.status(404).json({ message: "Lecture not found" });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (user.role === "admin") return res.json({ lecture });

  if (!user.subscription.includes(lecture.course)) {
    return res.status(400).json({ message: "You have not subscribed to this course" });
  }

  res.json({ lecture });
});

// ✅ Get all courses the user is subscribed to
export const getMyCourses = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const courses = await Courses.find({ _id: { $in: user.subscription } });

  res.json({ courses });
});

// ✅ Checkout and create Razorpay order
export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);

  if (!user || !course) return res.status(404).json({ message: "User or Course not found" });

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({ message: "You already have this course" });
  }

  const options = {
    amount: Number(course.price * 100), // Amount in paise
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(201).json({ order, course });
});

// ✅ Payment verification after the user completes payment
export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log("Received Razorpay Data:", req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");

  console.log("Expected Signature:", expectedSignature);
  console.log("Received Signature:", razorpay_signature);

  // ✅ Correct Signature Check
  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment Failed: Invalid Signature" });
  }

  // ✅ If signature is valid, process the payment
  await Payment.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);

  if (!user || !course) return res.status(404).json({ message: "User or Course not found" });

  user.subscription.push(course._id);
  await Progress.create({ course: course._id, completedLectures: [], user: req.user._id });

  await user.save();

  res.status(200).json({ message: "Course Purchased Successfully" });
});


// ✅ Add progress for a user
export const addProgress = TryCatch(async (req, res) => {
  const { lectureId } = req.query;
  if (!lectureId) return res.status(400).json({ message: "Lecture ID is required" });

  const progress = await Progress.findOne({ user: req.user._id, course: req.query.course });

  if (!progress) return res.status(404).json({ message: "Progress not found" });

  if (progress.completedLectures.includes(lectureId)) {
    return res.json({ message: "Progress recorded" });
  }

  progress.completedLectures.push(lectureId);
  await progress.save();

  res.status(201).json({ message: "New Progress added" });
});

// ✅ Get progress for a specific course
export const getYourProgress = TryCatch(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  if (!req.query.course) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  const courseId = new mongoose.Types.ObjectId(req.query.course);

  const progress = await Progress.findOne({ user: req.user._id, course: courseId });

  if (!progress) return res.status(404).json({ message: "No progress found" });

  const allLectures = await Lecture.countDocuments({ course: courseId });
  const completedLectures = progress.completedLectures.length;
  const courseProgressPercentage = (completedLectures * 100) / (allLectures || 1);

  res.json({ courseProgressPercentage, completedLectures, allLectures, progress });
});
