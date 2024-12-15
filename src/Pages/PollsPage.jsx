import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PollItem from "../Components/PollItems";
import { deleteSinglePoll, getPollList, votedPollOption } from "../slices/pollsSlice";
import ConformDeleteModal from "../Components/ConformDeleteModal";
import ChartModal from "../Components/ChartModel";

const PollsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [polls, setPolls] = useState([]);
  const [showPollChart, setShowPollChart] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);

  const dispatch = useDispatch();
  const { pollList = [], loading = false, pollListLength = 0 } = useSelector((state) => state.polls || {});

  useEffect(() => {
    dispatch(getPollList(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (pollList.length > 0) {
      setPolls((prevPolls) => {
        if (pageNumber === 1) {
          return pollList;
        } else {
          const newPolls = pollList.filter((newPoll) => !prevPolls.some((prevPoll) => prevPoll.id === newPoll.id));
          return [...prevPolls, ...newPolls];
        }
      });
    }
  }, [pollList, pageNumber]);

  const increaseVoteCount = (pollId, optionId) => {
    const updatedPolls = polls?.map((poll) => {
      if (poll.id === pollId) {
        const updatedOptions = poll.optionList?.map((option) => {
          if (option.id === optionId) {
            return { ...option, voteCount: [...option.voteCount, { optionId }] };
          }
          return option;
        });
        return { ...poll, optionList: updatedOptions };
      }
      return poll;
    });
    setPolls(updatedPolls);
    dispatch(votedPollOption(optionId));
  };

  const showPollChartModal = (poll) => {
    setShowPollChart(true);
    setSelectedPoll(poll);
  };

  const showDeleteModal = (poll) => {
    setSelectedPoll(poll);
    setShowDeletedModal(true);
  };

  const deletePoll = () => {
    dispatch(deleteSinglePoll(selectedPoll.id));
    setShowDeletedModal(false);
    setSelectedPoll(null);
    setPolls(polls.filter((poll) => poll.id !== selectedPoll.id));
  };

  return (
    <div className="mt-24">
      {polls.length === 0 && !loading ? (
        <div className="text-center mx-auto w-full mt-24">
          <p>No polls available.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 w-full sm:px-10 justify-center sm:justify-start">
        {polls.map((poll) => (
          <PollItem
            key={poll.id}
            poll={poll}
            showPollChartModal={showPollChartModal}
            showDeleteModal={showDeleteModal}
            increaseVoteCount={increaseVoteCount}
          />
        ))}
      </div>
      

      )}
      <div className="text-center mt-6">
        {!loading ? (
          <button
            onClick={() => setPageNumber((prevPage) => prevPage + 1)}
            className={`mx-auto sm:w-[180px] w-[140px] py-2 mt-8 px-6 ${pollListLength < 10 ? "bg-gray-400" : "bg-blue-400"} rounded-md mb-10`}
            disabled={pollListLength < 10}
          >
            Load More
          </button>
        ) : (
          <div className="text-center mx-auto w-full mt-10">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-secondary"></div>
          </div>
        )}
      </div>

      {showPollChart && (
        <ChartModal data={selectedPoll} setShowPollChart={setShowPollChart} />
      )}
      {showDeletedModal && (
        <ConformDeleteModal
          btnDeleteText={"Delete"}
          btnCancelText={"Cancel"}
          onBtnCancelClick={() => setShowDeletedModal(false)}
          modalTitle={"Delete"}
          modalSubTitle={"Are you sure you want to delete this item?"}
          onBtnOkClick={deletePoll}
          btnColor={"bg-red-500"}
        />
      )}
    </div>
  );
};

export default PollsPage;
