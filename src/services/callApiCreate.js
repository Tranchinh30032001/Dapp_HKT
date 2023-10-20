import { routes } from "../routes";
import { instanceAxios } from "./api-connect-wallet";
import dayjs from 'dayjs'

export const callApiCreate = async (valueSetup, valueQuest, valueReward) => {
    const status = valueQuest && valueSetup && valueReward;
    const tasks = [];
    if (valueQuest?.tokenHolder?.minimumAmount) {
        tasks.push({
            name: "Token Holder",
            block_chain_network: valueQuest?.tokenHolder?.network,
            total_token: valueQuest?.tokenHolder?.minimumAmount,
            categoryToken: valueQuest?.tokenHolder?.categoryToken
        })
    }
    if (valueQuest?.transactionActivity?.minimumAmount) {
        tasks.push({
            name: "Token Holder",
            block_chain_network: valueQuest?.transactionActivity?.network,
            total_token: valueQuest?.transactionActivity?.minimumAmount,
            categoryToken: valueQuest?.transactionActivity?.categoryToken
        })
    }
    const body = {
        name: valueSetup?.title,
        content: valueSetup?.description,
        start_at: dayjs(valueSetup?.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        end_at: dayjs(valueSetup?.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        thumbnail: valueSetup?.base64Thumbnail,
        reward_type: valueReward?.rewardType,
        block_chain_network: valueReward?.network,
        category_token: valueReward?.categoryToken,
        total_token: valueReward?.totalReward,
        total_person: valueReward?.numberWinner,
        twitter_follow: "https://twitter.com/" + valueQuest?.twitterFollow,
        twitter_retweet: valueQuest?. twitterRetweet,
        twitter_like: valueQuest?.twitterLike,
        twiter_hashtag: valueQuest?.twitterHashtag,
        status: status ? "Active" : "Draft",
        tasks
    }
    const res = await instanceAxios.post(routes.quest.createCampaign, body)
    return res;
}