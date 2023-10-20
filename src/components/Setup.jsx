import { Input, message } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { DatePicker, Button } from "antd";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSaveSuccess, setStateSetup } from "../redux/stateCampaign";
import { notifyError } from "../utils/toastify";
import dayjs from "dayjs";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { Upload } from "../asset/img";
import { callApiCreate } from "../services/callApiCreate";
import { useLocation, useNavigate } from "react-router-dom";

const IMAGE_MAX_SIZE = 5000000;

function Setup({ setValue, setValueSetup, data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetail = location.pathname.includes("detail");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { stateSetup } = useSelector((state) => state.stateCampaign);
  const [urlThumbnail, setUrlThumbnail] = useState("");
  const [rejected, setRejected] = useState([]);
  const [base64Thumbnail, setBase64Thumbnail] = useState("");
  const dispatch = useDispatch();

  const handleStartDate = (date) => {
    setStartDate(date.$d);
  };

  const handleEndDate = (date) => {
    setEndDate(date.$d);
  };
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;

        setBase64Thumbnail(base64String);
      };
      reader.readAsDataURL(acceptedFiles[0]);
      setUrlThumbnail(url);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: IMAGE_MAX_SIZE,
  });

  const handleNext = () => {
    if (title && description && startDate && endDate) {
      setValueSetup({
        title,
        description,
        startDate,
        endDate,
        base64Thumbnail,
        urlThumbnail,
      });
      setValue("Quest");
      dispatch(setStateSetup(true));
    } else {
      notifyError("Please complete all information !");
    }
  };

  const handleReset = () => {
    setValueSetup();
    dispatch(setStateSetup(false));
  };

  const handleSave = async () => {
    if (title && description && startDate && endDate) {
      const res = await callApiCreate({ title, description, startDate, endDate, base64Thumbnail });
      if (res.data.status === "success") {
        navigate("/campaign");
        dispatch(setSaveSuccess(true));
      }
    }
  };

  return (
    <div className="">
      <div className="mt-5 w-full border-[1px] border-[#279EFF] py-2 px-4 md:py-6 md:px-8 rounded-lg">
        <div className="mb-4 md:mb-6">
          <label htmlFor="default-input" className="heading">
            Title
          </label>
          <Input
            disabled={stateSetup || isDetail}
            value={data?.title || title}
            onChange={(e) => setTitle(e.target.value)}
            className="!leading-9 md:leading-[50px] placeholder:text-[18px] text-[18px]"
          />
        </div>

        <div>
          <label htmlFor="message" className="heading">
            Description
          </label>
          <Input.TextArea
            disabled={stateSetup || isDetail}
            value={data?.description || description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 mt-3 md:mt-5 w-full">
          <div className="w-full">
            <label className="block heading">Start Date</label>
            <DatePicker
              disabled={stateSetup || isDetail}
              value={data?.startDate && dayjs(data?.startDate)}
              onChange={handleStartDate}
              size="large"
              className="w-full p-3"
            />
          </div>
          <div className="w-full">
            <label className="block heading">End Date</label>
            <DatePicker
              disabled={stateSetup || isDetail}
              value={data?.endDate && dayjs(data?.endDate)}
              onChange={handleEndDate}
              size="large"
              className="w-full p-3 text-white"
            />
          </div>
        </div>
        <div className="w-full mt-4 relative">
          <label className="block heading">Upload Thumnail</label>
          <div
            style={{ userSelect: "none" }}
            disabled
            className="w-full md:w-[40%] border-dashed border-2 border-yellow-400 rounded-xl p-4 cursor-pointer flex flex-col items-center max-h-[200px] md:max-h-[400px] overflow-hidden"
            {...getRootProps()}
          >
            {!stateSetup && (
              <div
                style={{ display: urlThumbnail || data?.urlThumbnail ? "none" : "" }}
                className="flex flex-col items-center"
              >
                <p className="text-white">JPG, PNG, WEBM, MAX 100MB</p>
                <img src={Upload} className="w-[40px] md:w-[80px] m-2 " />
                <p className="text-white">Drag & drop file here</p>
                <p className="text-white">or Browser media on your device</p>
                <input {...getInputProps()} />
              </div>
            )}
            <div>
              <img src={data?.urlThumbnail || urlThumbnail} className="object-contain max-h-[300px] md:max-h-[360px]" />
            </div>
          </div>
          {(stateSetup || isDetail) && <div className="absolute inset-0 z-50"></div>}
        </div>
      </div>

      {!isDetail ? (
        <>
          <button
            style={{ display: !stateSetup ? "none" : "" }}
            onClick={handleReset}
            className="bg-[#D83F31] hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            Reset
          </button>

          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button
              style={{ display: stateSetup ? "none" : "" }}
              onClick={handleSave}
              className="bg-[#D83F31] hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded  mt-4 md:mt-8 text-[16px] md:text-[20px]"
            >
              Save
            </button>

            <button
              style={{ display: stateSetup ? "none" : "" }}
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded  mt-4 md:mt-8 text-[16px] md:text-[20px]"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        ""
      )}

      <ToastContainer />
    </div>
  );
}

export default Setup;
