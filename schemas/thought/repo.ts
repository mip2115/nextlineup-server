import ThoughtSchema from "./";
import { ThoughtEntity } from "../../types/thought";
import { v4 as uuidv4 } from "uuid";

const fromThoughtRepoToThoughtntity = (thought: any): ThoughtEntity => {
  const thoughtEntity: ThoughtEntity = {
    uuid: thought.uuid,
    createdAt: thought.createdAt,
    deletedAt: thought.deletedAt,
    updatedAt: thought.updatedAt,
    userUuid: thought.userUuid,
    postUuid: thought.postUuid,
    content: thought.content,
  };
  return thoughtEntity;
};
const deleteThoughts = async (thoughtUuids: string[]) => {
  try {
    await ThoughtSchema.deleteMany({ uuid: { $in: thoughtUuids } });
  } catch (e) {
    throw e;
  }
};

const getThoughtsForPostUuids = async (
  postUuids: string[]
): Promise<ThoughtEntity[]> => {
  try {
    const thoughtEntites: ThoughtEntity[] = [];
    const thoughts = await ThoughtSchema.find({ postUuid: { $in: postUuids } });

    for (let thought of thoughts) {
      const thoughtEntity = fromThoughtRepoToThoughtntity(thought);
      thoughtEntites.push(thoughtEntity);
    }
    return thoughtEntites;
  } catch (e) {
    throw e;
  }
};

const deleteThoughtsForPosts = async (postUuids: string[]): Promise<any> => {
  try {
    const thoughts = await ThoughtSchema.deleteMany({
      postUuid: { $in: postUuids },
    });
    return thoughts;
  } catch (e) {
    throw e;
  }
};

const getThoughtsByUserUuid = async (
  userUuid: string
): Promise<ThoughtEntity[] | null> => {
  try {
    const thoughtEntities: ThoughtEntity[] = [];
    const thoughts = ThoughtSchema.find({ userUuid: userUuid });

    // for (let i = 0; i < thoughts.length; i++) {
    //   const thought = thoughts[i];
    //   const thoughtEntity = fromThoughtRepoToThoughtntity(thought);
    //   thoughtEntities.push(thoughtEntity);
    // }
    return thoughtEntities;
  } catch (e) {
    throw e;
  }
};

const createThought = async (params: any): Promise<ThoughtEntity> => {
  const thought = new ThoughtSchema({
    userUuid: params.userUuid,
    postUuid: params.postUuid,
    content: params.content,
    uuid: params.uuid,
  });
  await thought.save();
  const thoughtEntity = fromThoughtRepoToThoughtntity(thought);
  return thoughtEntity;
};
export default {
  deleteThoughts,
  getThoughtsForPostUuids,
  deleteThoughtsForPosts,
  createThought,
  getThoughtsByUserUuid,
};
