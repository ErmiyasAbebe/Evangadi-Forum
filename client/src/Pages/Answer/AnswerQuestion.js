import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation, useParams } from "react-router-dom";
import QuestionsList from "../AskQuestion/QuestionList";
import axios from "axios";

const AnswerQuestion = (props) => {
  let { questionId } = useParams();
  // console.log(typeof questionId);
  // questionId = parseInt(questionId);
  const [userData, setUserData] = useContext(UserContext);
  console.log(userData);
  const [answer, setAnswer] = useState({});
  const [prevAnswers, setPrevAnswers] = useState();

  // get access to the data on state
  const location = useLocation();
  const { question, currentUserId } = location.state;
  console.log("Location data", question);

  const handleChange = async (e) => {
    console.log(e.target.value);
    await setAnswer({
      answer: e.target.value,
      questionId: question.question_id,
      userId: currentUserId,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(answer);

      await axios.post("http://localhost:4000/api/answer/", {
        answer: answer.answer,
        questionId: answer.questionId,
        userId: answer.userId,
      });

      console.log(">>>>> post answer 1");
      console.log(">>>>>>>>  your answer is submitted");
      window.location.reload(false);
    } catch (error) {
      console.log("Answers can't be submitted: ", error);
    }
  };

  useEffect(() => {
    // setAskedQuestion(question);
    const fetchAnswers = async () => {
      const answers = await axios.get(
        `http://localhost:4000/api/answer/${questionId}`
      );

      console.log(answers.data);
      console.log(answers.data.data);
      setPrevAnswers(() => {
        return answers.data?.data;
      });
      // console.log(">>>>>>prevAnswers ", prevAnswers);
    };
    try {
      fetchAnswers();

      console.log(">>>>> Successfully fetched answers.");
    } catch (err) {
      console.log(">>>>> Can't fetch answers.");
    }
  }, []);
  return (
    <div className="relative top-4 ms-8">
      <div className=" p-4">
        <div className="">
          <p className="text-xl font-semibold">Question</p>
          <p className="text-sm font-medium">{question?.question}</p>
          <p className="text-xs pb-6">{question?.question_description}</p>
        </div>

        <div className="mb-4">
          {prevAnswers?.length != 0 && (
            <h4 className=" text-xl font-semibold">
              Answer From the Community
            </h4>
          )}
        </div>

        <div className="answer__list">
          <div className="">
            {prevAnswers?.map((prevAnswer) => (
              <div key={prevAnswer.answerId}>
                <QuestionsList show={prevAnswer} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-40 ">
        <div className="text-center">
          <div className=" text-sm font-semibold ">Answer The top Question</div>
        </div>

        <div className="text-center">
          <Link to="/" className="answerext text-xs font-semibold mb-4">
            Go to Question page
          </Link>
        </div>

        <div className="answer__form">
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              name="answerField"
              placeholder="Your Answer ..."
              className="border border-gray-300 rounded-xl w-full h-28 p-2 resize-none"
            />

            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md text-xs">
              Post your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestion;
