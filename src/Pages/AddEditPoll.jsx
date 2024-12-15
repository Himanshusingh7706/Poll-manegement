import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPoll,
  getSinglePoll,
  updatePoll,
  updatePollTitle
} from '../slices/pollsSlice';
import { validateAddEditForm } from '../utils/validationUtils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ConfirmationDeleteModal from '../Components/ConformDeleteModal';
import ErrorComponent from '../Components/ErrorComponent';
import SuccessModal from '../Components/SuccessModal';
import { addOption, deleteOption, updateOption } from '../slices/optionSlice';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import ToastMessage from '../Components/ToastMessage';
const AddEditPoll = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [newPollData, setNewPollData] = useState({
    title: '',
    optionTitle: ''
  });
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({ title: '', optionTitle: '' });
  const [showModal, setShowModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editOption, setEditOption] = useState(null);
  const { loading } = useSelector((state) => state.poll || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getSinglePollDetails = async () => {
    try {
      if (state) {
        console.log('Using state for poll details:', state);
        setNewPollData({ title: state.title, optionTitle: '' });
        setOptions(state.optionList || []);
      } else if (id) {
        console.log('Fetching poll details with ID:', id);
        const result = await dispatch(getSinglePoll(id));
        console.log('API Result:', result);
        const poll = result?.payload;
        if (poll?.title && poll?.optionList) {
          setNewPollData({ title: poll.title, optionTitle: '' });
          setOptions(poll.optionList || []);
        } else {
          console.error(
            'Failed to fetch valid poll details. Response:',
            result?.payload
          );
        }
      } else {
        console.error('No state or ID provided for poll details');
      }
    } catch (error) {
      console.error('Error fetching poll details:', error);
    }
  };
  useEffect(() => {
    if (id) {
      getSinglePollDetails();
    }
  }, [id]);
  const handleOptionChange = (e) => {
    setNewPollData({ ...newPollData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAddOption = async () => {
    const { newErrors, isVallid } = validateAddEditForm({
      optionTitle: newPollData.optionTitle
    });
    if (isVallid) {
      setOptions([...options, { optionTitle: newPollData.optionTitle }]);
      if (editOption) {
        const newOptions = [...options];
        newOptions[editOption.index].optionTitle = newPollData.optionTitle;
        setOptions(newOptions);
      }

      if (id && editOption?.id) {
        dispatch(
          updateOption({
            id: editOption.id,
            editedOption: newPollData.optionTitle
          })
        );
      }
      if (id && !editOption?.id) {
        const result = await dispatch(
          addOption({
            id,
            optionTitle: newPollData.optionTitle
          })
        );
        if (result?.payload?.status === 200) {
          const newOptions = [...options, result?.payload?.data.option];
          setOptions(newOptions);
        }
      }
      setEditOption(null);
      setNewPollData({ ...newPollData, optionTitle: '' });
    } else {
      setErrors(newErrors);
    }
  };
  const handleDeleteOption = () => {
    if (id) {
      const deleteOptionId = options[selectedIndex].id;
      dispatch(deleteOption(deleteOptionId));
    }
    const newOptions = [...options];
    newOptions.splice(selectedIndex, 1);
    setOptions(newOptions);
    setShowDeletedModal(false);
    setSelectedIndex(null);
  };

  const handleUpdateOption = (index) => {
    const option = options[index];
    setNewPollData({ ...newPollData, optionTitle: option?.optionTitle });
    setEditOption({ index, id: option?.id });
  };

  // const handleShowModal = (data) => {
  //   if (data?.payload?.status === 200) {
  //     setShowModal(true);
  //   } else {
  //     setToastMessage(data?.payload?.message || 'An error occurred');
  //     setShowErrorToast(true);
  //   }
  // };
  const onFormSubmit = async () => {
    setSubmitting(true);
    const newPoll = {
      title: newPollData.title,
      options
    };
    const { newErrors, isVallid } = validateAddEditForm({
      options,
      title: newPollData.title
    });
    if (isVallid) {
      let result = {};
      try {
        if (id) {
          if (state.title !== newPollData.title) {
            result = await dispatch(updatePollTitle({ id, newPoll }));
          }
          setShowModal(true);
        } else {
          result = await dispatch(addPoll(newPoll));
          setShowModal(true);
        }
      } catch (error) {
        setToastMessage(error.message || 'An unexpected error occurred');
        setShowErrorToast(true);
      }
    } else {
      setErrors(newErrors);
    }
    setSubmitting(false);
  };

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto  p-8 bg-gray-100 rounded shadow-lg mt-24">
      <h2 className="text-xl font-semibold mb-4">
        {id ? 'Update' : 'Create'} Poll
      </h2>
      <div>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="title"
            className="w-full px-1 py-2 border rounded"
            value={newPollData.title}
            onChange={handleOptionChange}
          />
          <ErrorComponent errorMessage={errors.title} />
        </div>
        <div className="form-add-option">
          <p className="add-option">Option</p>
          <div className="flex my-2">
            <input
              id="option"
              name="optionTitle"
              className="border rounded-l-md p-2 w-full"
              value={newPollData.optionTitle}
              onChange={handleOptionChange}
              placeholder="Enter Option"
            />
            <button
              className="border-l border-gray-300 bg-blue-500 text-white p-2 rounded-r-md"
              onClick={() => handleAddOption()}
            >
              <IoIosAddCircle />
            </button>
          </div>
          <ErrorComponent errorMessage={errors.optionTitle} />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          {options.map((item, index) => (
            <div
              className="flex bg-white items-center max-w-full border rounded-lg p-2"
              key={index}
            >
              <span className="flex-grow">{item.optionTitle}</span>
              <div className="ml-auto flex gap-2">
                <button className="" onClick={() => handleUpdateOption(index)}>
                  <MdModeEditOutline />
                </button>
                <button
                  className=""
                  onClick={() => {
                    setSelectedIndex(index);
                    setShowDeletedModal(true);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full text-center mt-6">
          <button
            type="button"
            className="w-[50%] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => onFormSubmit()}
            disabled={loading || submitting}
          >
            {submitting ? (
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
      {showModal && (
        <SuccessModal
          show={showModal}
          message="Successfully"
          subtext={`Poll ${
            id ? 'updated' : 'created'
          } successfully. Click OK to redirect to the poll page.`}
          okButton="Ok"
          onOkClick={() => {
            navigate('/');
            setShowModal(false);
          }}
        />
      )}
      {showDeletedModal && (
        <ConfirmationDeleteModal
          modalTitle="Delete Option"
          modalSubTitle="Are you sure you want to delete this option?"
          btnDeleteText="Delete"
          btnCancelText="Cancel"
          onBtnCancelClick={() => setShowDeletedModal(false)}
          onBtnOkClick={handleDeleteOption}
        />
      )}
      <ToastMessage
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={toastMessage}
        variant="danger"
      />
    </div>
  );
};
export default AddEditPoll;