import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: { token },
        }
      );

      const options = {
        key: "rzp_test_2sRykxtwoMH88z",
        amount: order.amount,
        currency: "INR",
        name: "E-learning",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: { token },
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
            setLoading(false);
          }
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.contact || "0000000000",
        },
        theme: { color: "#8a4baf" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 my-8">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={`${server}/${course.image}`}
                  alt="Course"
                  className="w-40 h-40 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600">Instructor: {course.createdBy}</p>
                  <p className="text-gray-600">Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{course.description}</p>
              <p className="text-lg font-semibold text-indigo-600 mb-6">
                Let's get started with the course at ₹{course.price}
              </p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md transition"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow-md transition"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
