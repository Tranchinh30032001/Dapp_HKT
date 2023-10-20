import { useEffect, useState } from "react";
import Setup from "./Setup";
import Reward from "./Reward";
import Quest from "./Quest";
import Deposit from "./Deposit";
import Leaderboard from "./Leaderboard";
import { Segmented } from "antd";
import { ListTabs } from "../utils/listTabs";
import { useParams } from "react-router-dom";
import useGetApi from "../utils/hooks/useGetApi";
import { routes } from "../routes";
import { instanceAxios } from "../services/api-connect-wallet";

function Tabs() {
  const [value, setValue] = useState("Setup");
  const [valueSetup, setValueSetup] = useState();
  const [valueQuest, setValueQuest] = useState();
  const [valueReward, setValueReward] = useState();
  const param = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await instanceAxios.get(routes.quest.getDetailCampaign(param.id));
        setValueSetup({
          title: data?.name,
          description: data?.content,
          startDate: data?.start_at,
          endDate: data?.end_at,
          urlThumbnail: data?.featured_image,
        });
        // setValueQuest({
        //   twitterFollow: data?.,
        //   twitterRetweet: retweet,
        //   twitterLike: like,
        //   twitterHashtag: hashtag,
        //   tokenHolder: tokenHolder,
        //   transactionActivity: transactionActivity,
        // });
        setValueReward({
          rewardType: data?.reward_type,
          categoryToken: data?.category_name,
          totalReward: data?.total_token,
          numberWinner: data?.total_person,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    };
    if (param?.id) {
      fetch();
    }
  }, [param?.id]);

  const Options = {
    Setup: <Setup setValue={setValue} setValueSetup={setValueSetup} data={valueSetup} />,
    Quest: <Quest setValue={setValue} valueSetup={valueSetup} setValueQuest={setValueQuest} data={valueQuest} />,
    Reward: (
      <Reward
        setValue={setValue}
        valueSetup={valueSetup}
        valueQuest={valueQuest}
        setValueReward={setValueReward}
        data={valueReward}
      />
    ),
    Deposit: (
      <Deposit
        setValue={setValue}
        amount={valueReward?.totalReward}
        categoryToken={valueReward?.categoryToken}
        valueSetup={valueSetup}
        valueQuest={valueQuest}
        valueReward={valueReward}
      />
    ),
    Leaderboard: (
      <Leaderboard
        setValue={setValue}
        startDate={valueSetup?.startDate}
        endDate={valueSetup?.endDate}
        setValueSetup={setValueSetup}
        setValueQuest={setValueQuest}
        setValueReward={setValueReward}
      />
    ),
  };
  return (
    <>
      <div className="w-[50%] pb-4">
        <Segmented className="" options={ListTabs()} value={value} onChange={setValue} />
      </div>
      {Options[value]}
    </>
  );
}

export default Tabs;
